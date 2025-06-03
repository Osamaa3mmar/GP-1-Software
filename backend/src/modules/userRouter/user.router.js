import { Router } from "express";
import { addLink, editBio, editSpecialization,getTeachers, getFullProfile, getMyProfile, getTopStudents, getTeacherById, getUserById, editProfilePicture, resume } from "./user.controller.js";
import {auth} from '../../middleware/auth.js'
import { topicModel } from "../../../DB/models/Topic/Topic.js";
import { fileUpload } from "../../utils/fileUpload.js";
const router = Router();


router.get("/my-profile",auth(),getMyProfile);

router.post("/fullprofile",auth(),getFullProfile);
router.post("/upload/image", fileUpload().fields([{name:"image",maxCount:1}]),auth(),editProfilePicture);
router.post("/edit/specialization",auth(),editSpecialization);
router.post("/edit/bio",auth(),editBio);
router.post("/edit/addlink",auth(),addLink);
router.post("/upload/resume",fileUpload().single("resume"),auth(),resume);
router.get("/getTopStudents",getTopStudents);
router.get("/getTeachers", getTeachers);
router.get("/teacher/:id", getTeacherById);
router.get("/:id", auth(), getUserById);

export default router;
