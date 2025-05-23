import express from "express";
import { getAllNotifications, getUserChatHistory, subscribeToNewsletters, unsubscribeToNewsletters, updateUserProfile } from "../controllers/user.controllers.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();


router.patch("/update-user-profile", authenticateToken, upload.array("image", 1), updateUserProfile);


router.post("/subscribe-to-newsletters", subscribeToNewsletters);
router.delete("/unsubscribe-to-newsletters", unsubscribeToNewsletters);

router.get("/get-user-chat-history", authenticateToken, getUserChatHistory);

router.get("/get-all-notifications", authenticateToken, getAllNotifications);

export default router;