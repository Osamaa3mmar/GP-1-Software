import {Router} from 'express';
import { MessageModel } from '../../../../DB/models/MessageSystem/Message.js';
import { sendMessage,getMessage, editMessage ,reactToMessage} from './message.controller.js';
import { auth } from '../../../middleware/auth.js';

const router=Router();

router.post("/send",auth(),sendMessage);
router.get("/get/:messageId",getMessage);
router.post("/edit/:messageId",editMessage);
router.post("/react/:messageId",reactToMessage);






export default router;
