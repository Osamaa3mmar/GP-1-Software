import {Router} from "express";
import { choseAccountType, forgetPassword, login, resetPass, sendConfirmationEmail, signUp, verifyEmail } from "./auth.controller.js";
import { fileUpload } from "../../utils/fileUpload.js";
import { validation } from "../../middleware/validation.js";
import { loginSchema, signUpSchema, userTypeSchema } from "./auth.validate.js";
const router=Router();


// create  account 
router.post('/signup',fileUpload().single("profile"),validation(signUpSchema),signUp);
// decide account type
router.put('/accounttype',validation(userTypeSchema),choseAccountType);


// send confirmation email
router.put('/email/send/confirm',sendConfirmationEmail)

//confirm email
router.put("/email/send/verify",verifyEmail);


//login 
router.post('/login',validation(loginSchema),login);
router.post("/forget",forgetPassword);
router.post("/reset",resetPass);
export default router;