import {Router} from 'express';
import { auth } from '../../middleware/auth.js';
import { chackIsRate, rateCourse } from './rate.controller.js';

const router=Router();
router.get("/checkisrate",auth(),chackIsRate);
router.post("/ratecourse",auth(),rateCourse);
export default router;
