import { Router } from "express";
import { allUsers } from "../controllers/miscellaneousController.js";
const router = Router();
router.get("/admin/stat/users", allUsers);

export default router;