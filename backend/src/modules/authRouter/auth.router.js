import {Router} from "express";
import { signUp } from "./auth.controller.js";
import { fileUpload } from "../../utils/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { signUpSchema } from "./auth.validate.js";
const router=Router();

router.post('/signup',fileUpload().single("profile"),validation(signUpSchema),signUp);



export default router;