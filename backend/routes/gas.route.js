import express from "express";
import { getGasPrice } from "../controllers/gas.controller.js";
// import isAuthenticated from "../middleware/isAuthenticate.js";

const router = express.Router();

// Route
router.route("/gasprice").get( getGasPrice);

export default router;
