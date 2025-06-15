import {Router} from 'express';
import {  getConvMessages, getUserConvs, makeAllPastConv } from './conversition.controller.js';
import { auth } from '../../../middleware/auth.js';

const router=Router();
router.get("/makeallpast",makeAllPastConv);//usedOneTime
router.get("/getconversitions/user",auth(),getUserConvs);
router.post("/messages/user/:convId",auth(),getConvMessages);
export default router;
