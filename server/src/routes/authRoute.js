import express from "express";
import { login, logout, register, sendOTP } from "../controllers/authController.js";
import { upload } from "../middlewares/multerMiddleware.js";
const authRoutes = express.Router();

//register
authRoutes.post("/otp", sendOTP);
authRoutes.post("/register", upload.single("avatar"), register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);

export default authRoutes