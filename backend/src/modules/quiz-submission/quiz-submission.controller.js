import { quizSubmissionModel } from "../../../DB/models/Submissions/submissions.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";
import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";

// Submit a quiz
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers, timeSpent } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Validate required fields
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Quiz ID and answers array are required" });
    }

    // Check if quiz exists
    const quiz = await quizModel.findByPk(quizId, {
      include: [{
        model: courseModel,
        as: "course",
        include: [{
          model: organizationModel,
          as: "organization"
        }]
      }]
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Check if user is a teacher or course owner (organization owner)
    const isTeacher = quiz.course?.teacherId === userId;
    const isOrgOwner = quiz.course?.organization?.userId === userId;
    const isSpecialUser = isTeacher || isOrgOwner || userRole === 'admin';
    
    // If user is not a special user, check if they've already submitted
    if (!isSpecialUser) {
      // Check if user has already submitted this quiz
      const existingSubmission = await quizSubmissionModel.findOne({
        where: { userId, quizId }
      });

      if (existingSubmission) {
        return res.status(400).json({ message: "You have already submitted this quiz" });
      }
    }

    // Get all questions for this quiz
    const questions = await questionModel.findAll({
      where: { quizId }
    });

    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "This quiz has no questions" });
    }

    // Calculate score
    let score = 0;
    let totalMarks = 0;
    let correctAnswers = 0;

    // Create a map of question IDs to their correct answers and marks
    const questionMap = questions.reduce((map, question) => {
      map[question.id] = {
        correctAnswer: question.correctAnswer,
        marks: question.marks || 0
      };
      return map;
    }, {});

    // Check each answer
    for (const answer of answers) {
      const { questionId, selectedAnswer } = answer;
      
      if (questionMap[questionId]) {
        totalMarks += questionMap[questionId].marks;
        
        // Check if answer is correct
        if (selectedAnswer === questionMap[questionId].correctAnswer) {
          score += questionMap[questionId].marks;
          correctAnswers++;
        }
      }
    }

    // Create submission record and handle response in one block to avoid variable scope issues
    let submission;
    let submissionCreated = false;
    
    try {
      // First try - with totalMarks field
      submission = await quizSubmissionModel.create({
        userId,
        quizId,
        answers: answers,
        score,
        totalMarks, // Include total marks in the submission
        status: 'graded',
        submittedAt: new Date(),
        isTest: isSpecialUser // Mark as test if user is teacher, org owner or admin
      });
      submissionCreated = true;
    } catch (createError) {
      console.error('Error creating submission with totalMarks:', createError);
      
      try {
        // Second try - without totalMarks field
        submission = await quizSubmissionModel.create({
          userId,
          quizId,
          answers: answers,
          score,
          status: 'graded',
          submittedAt: new Date(),
          isTest: isSpecialUser // Mark as test if user is teacher, org owner or admin
        });
        submissionCreated = true;
      } catch (fallbackError) {
        console.error('Error creating submission without totalMarks:', fallbackError);
        // If both attempts fail, we'll still return a response with the calculated data
      }
    }

    // Calculate percentage
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;

    // Return result
    return res.status(200).json({
      message: submissionCreated ? "Quiz submitted successfully" : "Quiz processed but not saved",
      submission: {
        id: submission?.id,
        userId,
        quizId,
        score,
        totalMarks,
        correctAnswers,
        totalQuestions: questions.length,
        percentage,
        submittedAt: new Date(),
        saved: submissionCreated
      }
    });

  } catch (error) {
    console.error("Error submitting quiz:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get quiz submissions for a user
export const getUserSubmissions = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const submissions = await quizSubmissionModel.findAll({
      where: { userId },
      include: [
        {
          model: quizModel,
          as: "quiz",
          attributes: ["id", "title", "description", "totalMarks"]
        }
      ],
      order: [["submittedAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Submissions retrieved successfully",
      submissions
    });

  } catch (error) {
    console.error("Error getting user submissions:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get submissions for a specific quiz
export const getQuizSubmissions = async (req, res) => {
  try {
    const { quizId } = req.params;
    
    // Check if quiz exists
    const quiz = await quizModel.findByPk(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Get all submissions for this quiz
    const submissions = await quizSubmissionModel.findAll({
      where: { quizId },
      include: [
        {
          model: userModel,
          as: "student",
          attributes: ["id", "userName", "email"]
        }
      ],
      order: [["submittedAt", "DESC"]]
    });

    return res.status(200).json({
      message: "Quiz submissions retrieved successfully",
      submissions
    });

  } catch (error) {
    console.error("Error getting quiz submissions:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a specific submission
export const getSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    
    const submission = await quizSubmissionModel.findByPk(submissionId, {
      include: [
        {
          model: quizModel,
          as: "quiz",
          attributes: ["id", "title", "description", "totalMarks"]
        },
        {
          model: userModel,
          as: "student",
          attributes: ["id", "userName", "email"]
        }
      ]
    });

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    // Check if the user is authorized to view this submission
    // Only the student who made the submission or the instructor can view it
    if (submission.userId !== req.user.id && req.user.role !== "instructor") {
      return res.status(403).json({ message: "Unauthorized to view this submission" });
    }

    return res.status(200).json({
      message: "Submission retrieved successfully",
      submission
    });

  } catch (error) {
    console.error("Error getting submission:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
