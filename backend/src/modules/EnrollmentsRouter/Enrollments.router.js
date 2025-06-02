import {Router} from 'express'
import { allInCourse, allInOrg, enroll, getUserEnrolledCourses, getInProgressCoursesCount, getCompletedCoursesCount, getUserTotalPoints, getUserLearningHours, getStudentStatistics } from './Enrollments.controller.js';
import { auth } from '../../middleware/auth.js';
const router = Router();


router.post("/enroll",enroll);
router.get('/all/:id',auth(),allInCourse)
router.get("/all/courses/:orgId",auth(),allInOrg);
router.get("/user/enrolled",auth(),getUserEnrolledCourses);
router.get("/user/inprogress/count",auth(),getInProgressCoursesCount);
router.get("/user/completed/count",auth(),getCompletedCoursesCount);
router.get("/user/points",auth(),getUserTotalPoints);
router.get("/user/learning-hours",auth(),getUserLearningHours);
router.get("/statistics/:orgId",auth(),getStudentStatistics);
export default router;