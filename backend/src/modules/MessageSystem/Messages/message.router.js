import {Router} from 'express';
import { MessageModel } from '../../../../DB/models/MessageSystem/Message.js';
import { sendMessage } from './message.controller.js';
import { auth } from '../../../middleware/auth.js';

const router=Router();

router.post("/send",auth(),sendMessage);







export default router;
