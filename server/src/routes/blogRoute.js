import { Router } from "express";
import upload from "../middlewares/multerMiddleware.js";
import { createBlog, getAllBlog, getBlog, updateBlog } from "../controllers/blogController.js";

const blogRoutes = Router();

blogRoutes.post("/create", upload.single("image"), createBlog);

blogRoutes.put("/update/:id", upload.single("image"), updateBlog);

blogRoutes.get("/get-allblog", getAllBlog);
blogRoutes.get("/get-blog/:slug", getBlog);


export default blogRoutes;