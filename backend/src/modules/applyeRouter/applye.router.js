import {Router} from "express";
import { assignInstructor, checkisinit, getAllAccepted, getInstractourInfo, getResumesOrgInfo, getuser, kickInstructor, makeApplay, setResumeStatusAccepted, setResumeStatusDenied, unassignInstructor } from "./applye.controller.js";
import { auth } from "../../middleware/auth.js";
const router=Router();

router.get('/resume:id',getResumesOrgInfo);
router.get('/setStatusaccept/:id',setResumeStatusAccepted);
router.get('/setStatusdenied/:id',setResumeStatusDenied);
router.post('/makeapplay',auth(),makeApplay);

router.get('/getresumesrrginfo/:id',getResumesOrgInfo);
router.get('/instractour/:id',getInstractourInfo);

router.get('/getallaccepted/:id',getAllAccepted)
router.get('/getuser/:id',getuser)
router.delete('/kick/:userId', kickInstructor);
router.post('/assign/instructor',auth(),assignInstructor);
router.post('/unassign/instructor',auth(),unassignInstructor);
router.post('/checkisinit',auth(),checkisinit);
export default router;