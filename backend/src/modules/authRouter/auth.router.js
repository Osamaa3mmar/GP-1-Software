import {Router} from "express";
import { choseAccountType, signUp } from "./auth.controller.js";
import { fileUpload } from "../../utils/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { signUpSchema, userTypeSchema } from "./auth.validate.js";
const router=Router();

router.post('/signup',fileUpload().single("profile"),validation(signUpSchema),signUp);

router.put('/accounttype',validation(userTypeSchema),choseAccountType);

export default router;