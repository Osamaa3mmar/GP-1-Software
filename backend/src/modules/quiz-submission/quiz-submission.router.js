import { Router } from 'express';
import { submitQuiz, getUserSubmissions, getQuizSubmissions, getSubmission, isSubmitedUser, isTaken, startQuiz, saveAnswer, getSubmissionPreview } from './quiz-submission.controller.js';
import { auth } from '../../middleware/auth.js';

const router = Router();

// Start a quiz - creates initial submission
router.get("/start/:quizId", auth(), startQuiz);

// Save an answer during quiz
router.post("/answer", auth(), saveAnswer);

// Submit a quiz
router.post("/submit", auth(), submitQuiz);

// Get all submissions for a user
router.get("/user", auth(), getUserSubmissions);

// Get all submissions for a quiz
router.get("/quiz/:quizId", auth(), getQuizSubmissions);

// Get a specific submission
router.get("/isSubmitedUser/:quizId", auth(), isSubmitedUser);
router.get("/isTaken/:quizId", auth(), isTaken);
router.get("/submission/:submissionId/preview", auth(), getSubmissionPreview);
router.get("/:submissionId", auth(), getSubmission);

export default router;
