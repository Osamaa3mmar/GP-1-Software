import { Router } from "express";
import { getByCategoryId, getByCategoryName } from "./topic.controller.js";
const router = Router();
// ... define your routes here ...
router.get("/getByCategoryId/:id",getByCategoryId);
router.get("/getByCategoryName/:name",getByCategoryName);
export default router;
