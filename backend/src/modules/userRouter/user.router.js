import { Router } from "express";
import { getFullProfile, getMyProfile } from "./user.controller.js";
import {auth} from '../../middleware/auth.js'
const router = Router();


router.get("/my-profile",auth(),getMyProfile);

router.post("/fullprofile",auth(),getFullProfile);



export default router;
