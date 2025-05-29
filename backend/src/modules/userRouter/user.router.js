import { Router } from "express";
import { addLink, editBio, editSpecialization, getFullProfile, getMyProfile, getTopStudents, getTeachers, getTeacherById } from "./user.controller.js";
import {auth} from '../../middleware/auth.js'
import { topicModel } from "../../../DB/models/Topic/Topic.js";
const router = Router();


router.get("/my-profile",auth(),getMyProfile);

router.post("/fullprofile",auth(),getFullProfile);
router.post("/edit/specialization",auth(),editSpecialization);
router.post("/edit/bio",auth(),editBio);
router.post("/edit/addlink",auth(),addLink);
router.get("/getTopStudents",getTopStudents);
router.get("/getTeachers", getTeachers);
router.get("/teacher/:id", getTeacherById);

export default router;
