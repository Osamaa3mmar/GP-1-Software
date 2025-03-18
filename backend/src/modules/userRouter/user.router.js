import { Router } from "express";
import { getMyProfile } from "./user.controller.js";
import {auth} from '../../middleware/auth.js'
const router = Router();


router.get("/my-profile",auth(),getMyProfile);




export default router;
