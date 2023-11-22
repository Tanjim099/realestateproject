import {Router} from "express";
import { login, logout, register, sendOTP, updateUser } from "../controllers/authController.js";
import  upload  from "../middlewares/multerMiddleware.js";
const authRoutes = Router();

//register
authRoutes.post("/otp", sendOTP);
authRoutes.post("/register", upload.fields("avatar"), register);
authRoutes.post("/login", login);
authRoutes.get("/logout", logout);
authRoutes.put("/user/update/:id", upload.single("avatar"), updateUser);

export default authRoutes