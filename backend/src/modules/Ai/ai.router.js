import { Router } from "express";
import {  makeThump } from "./ai.controller.js";
import { auth } from "../../middleware/auth.js";

const router = Router();


router.post('/test', async(req, res) => {
    console.log(req.body);
    const {desc, subject} = req.body;
    const result = await makeThump(subject, desc);
    return res.status(200).json({message: "osama", result});
});

export default router;