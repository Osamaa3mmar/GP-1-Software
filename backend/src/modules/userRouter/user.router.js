import { Router } from "express";
import { addLink, editBio, editSpecialization, getFullProfile, getMyProfile, getUserById } from "./user.controller.js";
import {auth} from '../../middleware/auth.js'
import { topicModel } from "../../../DB/models/Topic/Topic.js";
const router = Router();


router.get("/my-profile",auth(),getMyProfile);
router.get("/:id", auth(), getUserById);

router.post("/fullprofile",auth(),getFullProfile);
router.post("/edit/specialization",auth(),editSpecialization);
router.post("/edit/bio",auth(),editBio);
router.post("/edit/addlink",auth(),addLink);
router.post("/update-profile", auth(), editBio);


export default router;
