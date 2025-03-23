import {Router} from 'express';
import { createCourse, getAdminCourses } from './course.controller.js';
import { fileUpload } from '../../utils/fileUpload.js';
import { auth } from '../../middleware/auth.js';
const router = Router();


router.post('/create',fileUpload().fields([{name:"thumbnail",maxCount:1},{name:"background",maxCount:1}]),auth(),createCourse);



router.get('/owner/courses',auth(),getAdminCourses);




export default router;