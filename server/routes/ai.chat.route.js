import express from "express";
import { chatWithAi } from "../controllers/ai.chat.controller.js";

const router = express.Router();

// Route
router.route("/").post(chatWithAi);

export default router;
