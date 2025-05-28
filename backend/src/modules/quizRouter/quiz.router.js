import { Router } from "express";
import { 
  generateQuiz, 
  notifyEnrollees, 
  getQuizByLessonId,
  addQuestionsToQuiz,
  getQuizBySectionId
} from "./quiz.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

// Generate a quiz for a lesson using AI
router.post("/generate", auth(), generateQuiz);

// Get a quiz by lesson ID
router.get("/lesson/:lessonId", auth(), getQuizByLessonId);

// Get a quiz by section ID
router.get("/section/:sectionId", auth(), getQuizBySectionId);

// Add questions to an existing quiz
router.post("/questions/:quizId", auth(), addQuestionsToQuiz);

// Create notification for all users enrolled in a course
router.post("/course-enrollees", auth(), notifyEnrollees);

export default router;
