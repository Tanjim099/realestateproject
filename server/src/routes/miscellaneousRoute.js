import { Router } from "express";
import { allUsers, deleteUser, getAllBlogs } from "../controllers/miscellaneousController.js";
const router = Router();
router.get("/admin/stat/users", allUsers);
router.delete("/admin/stat/user/:id", deleteUser);
router.get("/admin/stat/blogs", getAllBlogs);

export default router;