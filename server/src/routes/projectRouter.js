import { Router } from "express";
import { createProduct } from "../controllers/projectController.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.post('/create', upload.fields([
    { name: 'gallery', maxCount: 10 },  // Adjust maxCount as needed
    { name: 'floorPlan', maxCount: 5 },  // Adjust maxCount as needed
    { name: 'amenities', maxCount: 5 }   // Adjust maxCount as needed
  ]), createProduct);

export default router;