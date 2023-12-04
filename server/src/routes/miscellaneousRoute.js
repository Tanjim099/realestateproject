import { Router } from "express";
import { allUsers, deleteUser, getAllBlogs } from "../controllers/miscellaneousController.js";
import { createContact } from "../controllers/contactController.js";
const router = Router();
router.get("/admin/stat/users", allUsers);
router.delete("/admin/stat/user/:id", deleteUser);
router.get("/admin/stat/blogs", getAllBlogs);

router.post('/contact', createContact);

export default router;