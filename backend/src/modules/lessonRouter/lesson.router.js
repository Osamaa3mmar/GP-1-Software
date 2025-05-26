import { Router } from "express";
import { getallLessons } from "./lesson.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();
// ... define your routes here ...



router.get("/getall/:courseId",auth(),getallLessons);
export default router;
