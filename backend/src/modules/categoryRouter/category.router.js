import { Router } from "express";
import { getAll } from "./category.controller.js";
const router = Router();
// ... define your routes here ...
router.get("/", getAll)
export default router;
