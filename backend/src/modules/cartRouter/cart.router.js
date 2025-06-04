import { Router } from "express";
import {auth} from "../../middleware/auth.js";
import { addItemToCart, getCart,removeItem } from "./cart.controller.js";
const router = Router();

router.get("/get",auth(),getCart);
router.post("/additem",auth(),addItemToCart);
router.delete("/removeitem",auth(),removeItem);
export default router;
