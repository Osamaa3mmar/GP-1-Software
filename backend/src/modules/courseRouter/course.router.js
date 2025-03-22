import {Router} from 'express';
import { createCourse } from './course.controller.js';
import { fileUpload } from '../../utils/fileUpload.js';
import { auth } from '../../middleware/auth.js';
const router = Router();


router.post('/create',fileUpload().fields([{name:"thumbnail",maxCount:1},{name:"background",maxCount:1}]),auth(),createCourse);








export default router;