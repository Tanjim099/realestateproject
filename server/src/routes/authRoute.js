import { Router } from "express";
import { forgetPassword, getUserProfile, login, logout, register, sendOTP, updateUser } from "../controllers/authController.js";
import upload from "../middlewares/multerMiddleware.js";
import { requiredSignIn } from "../middlewares/authMiddleware.js";
const authRoutes = Router();

//register
authRoutes.post("/otp", sendOTP);
authRoutes.post("/register", upload.single("avatar"), register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.get("/forget-password", forgetPassword);
authRoutes.put("/user/update/:id", requiredSignIn, upload.single("avatar"), updateUser);
authRoutes.get("/get-profile/:id", requiredSignIn, getUserProfile);

export default authRoutes