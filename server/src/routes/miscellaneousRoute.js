import { Router } from "express";
import { allUsers, deleteUser } from "../controllers/miscellaneousController.js";
const router = Router();
router.get("/admin/stat/users", allUsers);
router.delete("/admin/stat/user/:id", deleteUser)

export default router;