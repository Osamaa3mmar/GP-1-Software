import {Router} from "express";
import { getAllAccepted, getInstractourInfo, getResumesOrgInfo, getuser, kickInstructor, makeApplay, setResumeStatusAccepted, setResumeStatusDenied } from "./applye.controller.js";
const router=Router();

router.get('/resume:id',getResumesOrgInfo);
router.get('/setStatusaccept/:id',setResumeStatusAccepted);
router.get('/setStatusdenied/:id',setResumeStatusDenied);
router.post('/makeapplay',makeApplay);

router.get('/getresumesrrginfo/:id',getResumesOrgInfo);
router.get('/instractour/:id',getInstractourInfo);

router.get('/getallaccepted/:id',getAllAccepted)
router.get('/getuser/:id',getuser)
router.delete('/kick/:userId', kickInstructor);

export default router;