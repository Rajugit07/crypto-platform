import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";

const router = express.Router();

router.route("/register").post(register);   //Register
router.route("/login").post(login);         //Login
router.route("/logout").get(logout);        //Logout

export default router;
