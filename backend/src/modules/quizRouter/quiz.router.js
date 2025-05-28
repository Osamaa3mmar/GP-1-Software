import { Router } from "express";
import { generateQuiz, notifyEnrollees, getQuizByLessonId } from "./quiz.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();

// Generate a quiz for a lesson using AI
router.post("/generate", auth(), generateQuiz);

// Get a quiz by lesson ID
router.get("/lesson/:lessonId", auth(), getQuizByLessonId);

// Create notification for all users enrolled in a course
router.post("/course-enrollees", auth(), notifyEnrollees);

export default router;
