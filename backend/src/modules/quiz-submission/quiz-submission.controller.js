import { quizSubmissionModel } from "../../../DB/models/Submissions/submissions.js";
import { questionModel } from "../../../DB/models/qusetions/Qustion.js";
import { quizModel } from "../../../DB/models/quizes/Quiz.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import { where } from "sequelize";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";

// Submit a quiz
export const submitQuiz = async (req, res) => {
  try {
    const { quizId, answers} = req.body;
    const userId = req.body.user.id;
    const userRole = req.body.user.role;
    if (!quizId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Quiz ID and answers array are required" });
    }
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
    const enrollment=await enrollmentModel.findOne({
      where: {
        courseId: quiz.course.id,
        studentId: userId
      }
    });
    console.log(enrollment,"enrollment");
    const isTeacher = quiz.course?.teacherId === userId;
    const isOrgOwner = quiz.course?.organization?.userId === userId;
    const isSpecialUser = isTeacher || isOrgOwner || userRole === 'admin';
    if (!isSpecialUser) {
      const existingSubmission = await quizSubmissionModel.findOne({
        where: { userId, quizId }
      });
      if (existingSubmission) {
        return res.status(400).json({ message: "You have already submitted this quiz" });
      }
    }
    const questions = await questionModel.findAll({
      where: { quizId }
    });
    if (!questions || questions.length === 0) {
      return res.status(400).json({ message: "This quiz has no questions" });
    }
    let score = 0;
    let totalMarks = 0;
    let correctAnswers = 0;
    const questionMap = questions.reduce((map, question) => {
      map[question.id] = {
        correctAnswer: question.correctAnswer,
        marks: question.marks || 0
      };
      return map;
    }, {});

    for (const answer of answers) {
      const { questionId, selectedAnswer } = answer;
      if (questionMap[questionId]) {
        totalMarks += questionMap[questionId].marks;
        if (selectedAnswer === questionMap[questionId].correctAnswer) {
          score += questionMap[questionId].marks;
          correctAnswers++;
        }
      }
    }
    let submission;
    let submissionCreated = false;
    enrollment.points+=score;
    await enrollment.save();
      submission = await quizSubmissionModel.create({
        userId,
        quizId,
        answers: answers,
        score,
        maxScore: totalMarks,
        status: 'graded',
        submittedAt: new Date(),
      });
      submissionCreated = true;
    return res.status(200).json({
      message: submissionCreated ? "Quiz submitted successfully" : "Quiz processed but not saved",
      submission
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

// Start a quiz - creates an initial submission record with 'started' status
export const startQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

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
    
    // If user is not a special user, check if they've already submitted or started
    if (!isSpecialUser) {
      // Check if user has already submitted or started this quiz
      const existingSubmission = await quizSubmissionModel.findOne({
        where: { userId, quizId }
      });

      if (existingSubmission) {
        // If submission is already completed, return error
        if (existingSubmission.status === 'graded') {
          return res.status(400).json({ 
            message: "You have already completed this quiz",
            submission: existingSubmission
          });
        }
        
        // If submission is started but not completed, check if it's still valid (within time limit)
        const startTime = new Date(existingSubmission.startedAt);
        const currentTime = new Date();
        const timeElapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
        
        // Get quiz time limit (default to 30 minutes if not specified)
        const timeLimit = quiz.timeLimit || 30;
        
        if (timeElapsedMinutes < timeLimit) {
          // Quiz is still valid, return the existing submission
          return res.status(200).json({
            message: "Quiz already in progress",
            submission: existingSubmission,
            timeRemaining: (timeLimit - timeElapsedMinutes) * 60 // in seconds
          });
        } else {
          // Time expired, update the submission to 'expired'
          await existingSubmission.update({
            status: 'expired',
            submittedAt: new Date()
          });
          
          // Create a new submission if it's a regular user (not a special user)
          if (!isSpecialUser) {
            return res.status(400).json({
              message: "Your previous attempt has expired. You cannot retake this quiz.",
              submission: existingSubmission
            });
          }
        }
      }
    }
    
    // For special users (teachers, admins) or first-time regular users, create a new submission
    let submission;
    try {
      submission = await quizSubmissionModel.create({
        userId,
        quizId,
        answers: [],
        score: 0,
        status: isSpecialUser ? 'test' : 'started',
        startedAt: new Date(),
        timeSpent: 0
      });
    } catch (error) {
      console.error('Error creating initial submission:', error);
      return res.status(500).json({ message: "Failed to start quiz", error: error.message });
    }
    
    // Get questions for the quiz (without correct answers for security)
    const questions = await questionModel.findAll({
      where: { quizId },
      attributes: ['id', 'questionText', 'options', 'type', 'marks']
    });
    
    return res.status(200).json({
      message: isSpecialUser ? "Test mode started" : "Quiz started",
      submission: {
        id: submission.id,
        startedAt: submission.startedAt,
        status: submission.status,
        timeLimit: quiz.timeLimit || 30 // in minutes
      },
      quiz: {
        id: quiz.id,
        title: quiz.title,
        description: quiz.description,
        totalMarks: quiz.totalMarks || questions.reduce((sum, q) => sum + (q.marks || 0), 0),
        timeLimit: quiz.timeLimit || 30 // in minutes
      },
      questions
    });
  } catch (error) {
    console.error("Error starting quiz:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Save an answer for a quiz in progress
export const saveAnswer = async (req, res) => {
  try {
    const { submissionId, questionId, selectedAnswer } = req.body;
    const userId = req.user.id;
    
    // Find the submission
    const submission = await quizSubmissionModel.findOne({
      where: { id: submissionId, userId }
    });
    
    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    
    // Check if submission is still in progress
    if (submission.status !== 'started' && submission.status !== 'test') {
      return res.status(400).json({ message: `Cannot update answers for a ${submission.status} submission` });
    }
    
    // Check if time limit has expired (except for test submissions)
    if (submission.status === 'started') {
      const startTime = new Date(submission.startedAt);
      const currentTime = new Date();
      const timeElapsedMinutes = Math.floor((currentTime - startTime) / (1000 * 60));
      
      // Get the quiz to check time limit
      const quiz = await quizModel.findByPk(submission.quizId);
      const timeLimit = quiz?.timeLimit || 30;
      
      if (timeElapsedMinutes >= timeLimit) {
        // Time expired, update the submission to 'expired'
        await submission.update({
          status: 'expired',
          submittedAt: new Date()
        });
        
        return res.status(400).json({
          message: "Time limit expired. Your quiz has been automatically submitted.",
          submission: submission
        });
      }
    }
    
    // Update the answers array
    let answers = submission.answers || [];
    
    // Check if this question has already been answered
    const existingAnswerIndex = answers.findIndex(a => a.questionId === questionId);
    
    if (existingAnswerIndex >= 0) {
      // Update existing answer
      answers[existingAnswerIndex].selectedAnswer = selectedAnswer;
    } else {
      // Add new answer
      answers.push({ questionId, selectedAnswer });
    }
    
    // Update the submission
    await submission.update({ answers });
    
    return res.status(200).json({
      message: "Answer saved successfully",
      submissionId: submission.id,
      questionId,
      selectedAnswer
    });
  } catch (error) {
    console.error("Error saving answer:", error);
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

// Get a detailed preview of a quiz submission with all related data
export const getSubmissionPreview = async (req, res) => {
  // try {
    const { submissionId } = req.params;
    const userId = req.body.user.id;
    const userRole = req.body.user.role;
    
    // Find the submission with related quiz and student info
    const submission = await quizSubmissionModel.findByPk(submissionId, {
      include: [
        {
          model: quizModel,
          as: "quiz",
          include: [
            {
              model: courseModel,
              as: "course",
            }
          ]
        },
        {
          model: userModel,
          as: "student",
        }
      ]
    });

    if (!submission) {
      return res.status(404).json({
        success: false,
        message: "Submission not found"
      });
    }

    // Check if the user is authorized to view this submission
    // Allow access if: user is the submitter, or user is an instructor/admin/owner
    if (submission.userId !== userId && 
        userRole !== "instructor" && 
        userRole !== "admin" && 
        userRole !== "owner") {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to view this submission"
      });
    }

    // Get the questions for this quiz with correct answers
    const questions = await questionModel.findAll({
      where: { quizId: submission.quizId },
    });

    // Process the submission data to include detailed information
    const plainSubmission = submission.get({ plain: true });
plainSubmission.quiz.questions = questions;

return res.status(200).json({ success: true, data: plainSubmission });



  // } catch (error) {
  //   console.error("Error getting submission preview:", error);
  //   return res.status(500).json({
  //     success: false,
  //     message: "Server error",
  //     error: error.message
  //   });
  // }
};


export const isSubmitedUser=async(req,res)=>{




  try{
const {quizId}=req.params;
const {user}=req.body;
const submission=await quizSubmissionModel.findOne({
  where:{quizId,userId:user.id}
})
if(!submission){
  return res.status(200).json({message:"Submission not found"})
}
return res.status(404).json({message:"success",submission})
  }catch(error){
    return res.status(500).json({message:"Server error",error:error.message})
  }
}




export const isTaken = async (req, res) => {
  try {
    const { quizId } = req.params;
    const userId = req.body.user.id;
    
    const submission = await quizSubmissionModel.findOne({
      where: {
        quizId,
        userId
      },
      include: [
        {
          model: quizModel,
          as: "quiz",
          attributes: ["id", "title", "description", "totalMarks"]
        }
      ]
    });
    
    if (!submission) {
      return res.status(200).json({ message: "Not taken", taken: false });
    }
    // Return the submission data along with taken status
    return res.status(200).json({
      message: "Taken", 
      taken: true,
      submission
    });
  } catch (error) {
    console.error("Error checking if quiz is taken:", error);
    return res.status(500).json({ message: "Server error", error: error.message })
  }
}

// This function has been moved to line ~403