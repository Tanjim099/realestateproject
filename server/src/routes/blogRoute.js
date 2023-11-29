import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { createBlog } from "../controllers/blogController.js";

const blogRoutes = Router();

blogRoutes.post("/create", upload.single("image"), createBlog);


export default blogRoutes;