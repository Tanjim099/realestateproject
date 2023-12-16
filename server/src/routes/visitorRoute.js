import { Router } from "express";
import { getVisitor } from "../controllers/visitorController.js";

const router = Router();
router.post("/log-visit", getVisitor);

export default router;