import express from "express";
import { createConversation, deleteAllChats, deleteAllMessages, getChatBetweenUsers, sendMessage } from "../controllers/message.controllers.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";

const router = express.Router();

// GET REQUESTS
router.get("/get-chat-between-users/:id", authenticateToken, getChatBetweenUsers);

// POST REQUESTS
router.post("/send-message", authenticateToken, sendMessage);

router.post("/create-conversation/:id", authenticateToken, createConversation);

// DELETE REQUESTS

export default router;