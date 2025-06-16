import {Router} from 'express';
import {  getConvMessages, getUserConvs, makeAllPastConv,getOrgConvs } from './conversition.controller.js';
import { auth } from '../../../middleware/auth.js';

const router=Router();
router.get("/makeallpast",makeAllPastConv);//usedOneTime
router.get("/getconversitions/user",auth(),getUserConvs);
router.get("/getconversitions/org",auth(),getOrgConvs);
router.post("/messages/user/:convId",auth(),getConvMessages);
export default router;
