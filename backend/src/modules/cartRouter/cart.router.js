import { Router } from "express";
import {auth} from "../../middleware/auth.js";
import { addItemToCart, getCart,checkEnrollment,removeItem,purchaseCourses } from "./cart.controller.js";
const router = Router();

router.get("/get",auth(),getCart);
router.post("/additem",auth(),addItemToCart);
router.delete("/removeitem",auth(),removeItem);
router.get("/purchase",auth(),purchaseCourses);
router.get("/checkenrollment",auth(),checkEnrollment)
export default router;
