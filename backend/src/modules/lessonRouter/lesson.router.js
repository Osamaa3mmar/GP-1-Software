import { Router } from "express";
import { getallLessons, addLesson, updateLesson, deleteLesson } from "./lesson.controller.js";
import { auth } from "../../middleware/auth.js";
const router = Router();

// Get all lessons for a course
router.get("/getall/:courseId", auth(), getallLessons);

// Add a new lesson
router.post("/add", auth(), addLesson);

// Update an existing lesson
router.put("/update", auth(), updateLesson);

// Delete a lesson
router.delete("/delete", auth(), deleteLesson);

export default router;
