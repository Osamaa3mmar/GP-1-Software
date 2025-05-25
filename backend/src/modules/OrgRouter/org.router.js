import {Router} from 'express';
import { organizationModel } from '../../../DB/models/organaization/organaization.js';
import { userModel } from '../../../DB/models/UserModel/user.model.js';
import { auth } from '../../middleware/auth.js';
import { editOrgDescription, editOrgImages, editOrgName, getByOrganizationID, getinstructors , getTopOrganizations} from './org.controller.js';
import { fileUpload } from '../../utils/fileUpload.js';

const router=Router();


router.get("/getorg/:id",getByOrganizationID);
router.get('/getinstructors',auth(),getinstructors)
router.post('/edit/name/:id',auth(),editOrgName);
router.post('/edit/description/:id',auth(),editOrgDescription);
router.post('/edit/images/:id',fileUpload().fields([{name:"profile",maxCount:1},{name:"background",maxCount:1}]),auth(),editOrgImages);
router.get('/getTopOrganizations',getTopOrganizations)

export default router;