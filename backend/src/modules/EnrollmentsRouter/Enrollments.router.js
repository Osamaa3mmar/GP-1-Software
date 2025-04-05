import {Router} from 'express'
import { enroll } from './Enrollments.controller.js';
const router = Router();


router.post("/enroll",enroll);


export default router;