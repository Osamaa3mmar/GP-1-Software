import { Router } from 'express';
import { submitQuiz, getUserSubmissions, getQuizSubmissions, getSubmission } from './quiz-submission.controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

// Submit a quiz
router.post("/submit", auth(), submitQuiz);

// Get all submissions for a user
router.get("/user", auth(), getUserSubmissions);

// Get all submissions for a quiz
router.get("/quiz/:quizId", auth(), getQuizSubmissions);

// Get a specific submission
router.get("/:submissionId", auth(), getSubmission);

export default router;
