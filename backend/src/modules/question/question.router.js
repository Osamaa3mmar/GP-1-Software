import {Router} from 'express';
import { deleteQustion, getAllByQuizId, saveQustion } from './question.controller.js';
import { auth } from '../../middleware/auth.js';

const router=Router();

router.post("/save",auth(),saveQustion);
router.get("/getall/:quizId",auth(),getAllByQuizId);
router.delete("/delete",auth(),deleteQustion);
export default router;
