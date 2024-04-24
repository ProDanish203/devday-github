import { Router } from "express";
import {
  addMembers,
  createBackup,
  createProject,
  getAllProjects,
  getMyProjects,
  getSingleProject,
  rollbackTo,
  verifyMember,
} from "../controllers/project.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";

const router = Router();
router.use(verifyAuth(Object.values(ROLES)));

router.get("/", getAllProjects);
router.get("/single/:id", getSingleProject);
router.post("/create", createProject);
router.get("/my-projects", getMyProjects);

router.put("/add-members/:id", addMembers);
router.put("/verify-member/:id", verifyMember);

export default router;
