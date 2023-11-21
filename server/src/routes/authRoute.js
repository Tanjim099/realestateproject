import express from "express";
import { register } from "../controllers/authController.js";
import { upload } from "../middlewares/multerMiddleware.js";
const authRoutes = express.Router();

//register
authRoutes.post("/register", upload.single("avatar"), register);

export default authRoutes