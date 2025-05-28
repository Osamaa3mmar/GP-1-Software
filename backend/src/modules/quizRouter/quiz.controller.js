import { generateQuizQuestion } from "../../utils/ChatGptQuizGenerator.js";
import { lessonModel } from "../../../DB/models/Lessons/Lesson.js";
import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";
import { makeNotification } from "../Notification/Notification.controller.js";

// Generate a quiz for a lesson using AI
export const generateQuiz = async (req, res) => {
  try {
    const { lessonId, title, description, content } = req.body;
    const userId = req.user.id;

    if (!lessonId || !title) {
      return res.status(400).json({ message: "Lesson ID and title are required" });
    }

    // Find the lesson to get course information
    const lesson = await lessonModel.findByPk(lessonId, {
      include: [
        {
          association: "course",
          include: [{ association: "organization" }]
        }
      ]
    });

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Check if user is authorized (teacher or organization owner)
    const isTeacher = lesson.course?.teacherId === userId;
    const isOrgOwner = lesson.course?.organization?.userId === userId;

    if (!isTeacher && !isOrgOwner) {
      return res.status(403).json({ message: "Not authorized to generate quiz for this lesson" });
    }

    // Check if a quiz already exists for this lesson
    let quiz = await quizModel.findOne({
      where: { lessonId }
    });

    // If quiz exists, update it, otherwise create a new one
    if (quiz) {
      quiz = await quiz.update({
        title,
        description: description || `Quiz for ${lesson.title}`,
        updatedAt: new Date()
      });
    } else {
      // Check if the Quiz model has a lessonId field
      // If not, we'll just use courseId
      try {
        quiz = await quizModel.create({
          title,
          description: description || `Quiz for ${lesson.title}`,
          lessonId,
          courseId: lesson.courseId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      } catch (createError) {
        console.error("Error creating quiz with lessonId:", createError);
        // Try without lessonId if it's not in the model
        quiz = await quizModel.create({
          title,
          description: description || `Quiz for ${lesson.title}`,
          courseId: lesson.courseId,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    // Generate questions using AI
    const topic = lesson.title;
    const details = content || lesson.description;
    
    // Generate 5 multiple choice questions
    const mcqQuestions = await generateQuizQuestion(topic, details, "medium", "mcq", 3);
    
    // Generate 2 true/false questions
    const tfQuestions = await generateQuizQuestion(topic, details, "medium", "true_false", 2);
    
    // Combine all questions
    const questions = [...mcqQuestions, ...tfQuestions];
    
    // Save questions to database
    for (const question of questions) {
      await questionModel.create({
        quizId: quiz.id,
        questionText: question.questionText,
        explanation: question.explanation,
        marks: question.marks || 5,
        type: question.type,
        options: question.options || [],
        correctAnswer: question.correctAnswer || ''
      });
    }
    
    // Create notification for the academy (organization) about the new quiz
    if (lesson.course.orgId) {
      const message = `A new quiz was generated for lesson "${lesson.title}" in course "${lesson.course.title}"`;
      const actionUrl = `/main/classrooms/${lesson.courseId}/lessons/lesson/${lessonId}`;
      await makeNotification("add", "quiz", message, actionUrl, lesson.course.orgId, false, null);
    }

    return res.status(200).json({
      message: "Quiz generated successfully",
      quizId: quiz.id
    });
  } catch (error) {
    console.error("Error generating quiz:", error);
    return res.status(500).json({ message: "Error generating quiz", error: error.message });
  }
};

// Create a notification for all users enrolled in a course
// Get a quiz by lesson ID
export const getQuizByLessonId = async (req, res) => {
  try {
    const { lessonId } = req.params;
    
    if (!lessonId) {
      return res.status(400).json({ message: "Lesson ID is required" });
    }
    
    // Find quiz for this lesson
    const quiz = await quizModel.findOne({
      where: { lessonId }
    });
    
    if (!quiz) {
      return res.status(404).json({ message: "No quiz found for this lesson" });
    }
    
    return res.status(200).json({
      message: "Quiz found",
      quizId: quiz.id,
      title: quiz.title
    });
  } catch (error) {
    console.error("Error getting quiz by lesson ID:", error);
    return res.status(500).json({ message: "Error getting quiz", error: error.message });
  }
};

export const notifyEnrollees = async (req, res) => {
  try {
    const { courseId, message, actionUrl, type, entityType } = req.body;
    const userId = req.user.id;

    if (!courseId || !message || !actionUrl) {
      return res.status(400).json({ message: "Course ID, message, and action URL are required" });
    }

    // Get course to check authorization
    const course = await lessonModel.sequelize.models.Course.findByPk(courseId, {
      include: [{ association: "organization" }]
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if user is authorized (teacher or organization owner)
    const isTeacher = course.teacherId === userId;
    const isOrgOwner = course.organization?.userId === userId;

    if (!isTeacher && !isOrgOwner) {
      return res.status(403).json({ message: "Not authorized to send notifications for this course" });
    }

    // Get all enrollments for this course
    const enrollments = await lessonModel.sequelize.models.Enrollment.findAll({
      where: { courseId }
    });

    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ message: "No enrollments found for this course" });
    }

    // Send notification to each enrolled user
    const notificationPromises = enrollments.map(enrollment => 
      makeNotification(
        type || "add", 
        entityType || "lesson", 
        message, 
        actionUrl, 
        null, 
        true, 
        enrollment.userId
      )
    );

    await Promise.all(notificationPromises);

    return res.status(200).json({
      message: `Notifications sent to ${enrollments.length} enrolled users`,
      count: enrollments.length
    });
  } catch (error) {
    console.error("Error sending notifications to enrollees:", error);
    return res.status(500).json({ message: "Error sending notifications", error: error.message });
  }
};
