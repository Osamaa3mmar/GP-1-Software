import { Router } from "express";
import { getUserNotifications,getOrgNotifications, setReadNotification, setReadNotificationAll } from "./Notification.controller.js";
const router = Router();


router.get("/user/:id",getUserNotifications);
router.get("/org/:orgId",getOrgNotifications);
router.get("/setread/:id",setReadNotification);
router.post("/setreadall",setReadNotificationAll);












export default  router;