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

router.post("/generate", auth(), generateQuiz);

router.get("/lesson/:lessonId", auth(), getQuizByLessonId);

router.get("/section/:sectionId", auth(), getQuizBySectionId);

router.post("/questions/:quizId", auth(), addQuestionsToQuiz);

router.post("/course-enrollees", auth(), notifyEnrollees);

export default router;
