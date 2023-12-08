import { Router } from "express";
import { allUsers, deleteUser, getAllBlogs, getAllProjects } from "../controllers/miscellaneousController.js";
import { createContact, getAllContacts } from "../controllers/contactController.js";
const router = Router();
router.get("/admin/stat/users", allUsers);
router.delete("/admin/stat/user/:id", deleteUser);
router.get("/admin/stat/blogs", getAllBlogs);

router.post('/contact', createContact);
router.get('/admin/stat/contacts', getAllContacts);
router.get('/admin/stat/projects', getAllProjects);

export default router;