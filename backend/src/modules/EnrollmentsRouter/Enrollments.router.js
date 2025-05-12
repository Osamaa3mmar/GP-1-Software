import {Router} from 'express'
import { allInCourse, allInOrg, enroll } from './Enrollments.controller.js';
import { auth } from '../../middleware/auth.js';
const router = Router();


router.post("/enroll",enroll);
router.get('/all/:id',auth(),allInCourse)
router.get("/all/courses/:orgId",auth(),allInOrg);
export default router;