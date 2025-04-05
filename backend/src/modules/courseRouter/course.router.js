import {Router} from 'express';
import { courseToggleStatus, createCourse, deleteCourse, getAdminCourses, getAllCourses, getDetailedCourseInfo } from './course.controller.js';
import { fileUpload } from '../../utils/fileUpload.js';
import { auth } from '../../middleware/auth.js';
const router = Router();


router.post('/create',fileUpload().fields([{name:"thumbnail",maxCount:1},{name:"background",maxCount:1}]),auth(),createCourse);



router.get('/owner/courses',auth(),getAdminCourses);
router.put('/togglestatus/:id',auth(),courseToggleStatus);
router.delete('/delete/:id',auth(),deleteCourse);
router.get('/getall',getAllCourses);
router.get('/getdetailedinfo/:id',auth(),getDetailedCourseInfo)
router.delete('/delete',() => {});

export default router;