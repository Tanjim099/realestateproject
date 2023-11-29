import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { createBlog, updateBlog } from "../controllers/blogController.js";

const blogRoutes = Router();

blogRoutes.post("/create", upload.single("image"), createBlog);

blogRoutes.put("/update/:id", upload.single("image"), updateBlog);


export default blogRoutes;