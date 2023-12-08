import { Router } from "express";
import { createProject, updateProject, deleteProject, getAllProject, getProject, searchProject, getAllProjectsByPage } from "../controllers/projectController.js";
import upload from "../middlewares/multerMiddleware.js";
import { isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

router.post('/create', upload.fields([
    { name: 'gallery', maxCount: 10 },  // Adjust maxCount as needed
    { name: 'floorPlan', maxCount: 5 },  // Adjust maxCount as needed
    { name: 'amenities', maxCount: 5 }   // Adjust maxCount as needed
]), createProject);

router.put('/update/:id', upload.fields([
    { name: 'gallery', maxCount: 10 },  // Adjust maxCount as needed
    { name: 'floorPlan', maxCount: 5 },  // Adjust maxCount as needed
    { name: 'amenities', maxCount: 5 }   // Adjust maxCount as needed
]), updateProject);

router.get("/get/:id", getProject);
router.get("/getall", getAllProject);
router.get("/get-all/projets", getAllProjectsByPage);
router.delete("/delete/:id", deleteProject);
router.get("/search/project", searchProject);
export default router;