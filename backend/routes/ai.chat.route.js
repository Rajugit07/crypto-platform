import express from "express";
import { chatWithAi } from "../controllers/ai.chat.controller.js";
import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

// Route
router.route("/").post(isAuthenticated, chatWithAi);

export default router;
