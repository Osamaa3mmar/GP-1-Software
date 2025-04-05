import {Router} from 'express';
import { organizationModel } from '../../../DB/models/organaization/organaization.js';
import { userModel } from '../../../DB/models/UserModel/user.model.js';
import { auth } from '../../middleware/auth.js';
import { getByOrganizationID, getinstructors } from './org.controller.js';

const router=Router();


router.get("/getorg/:id",getByOrganizationID);
router.get('/getinstructors',auth(),getinstructors)


export default router;