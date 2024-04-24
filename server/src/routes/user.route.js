import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getNotifications,
  getSingleUser,
  readNotifcations,
  updateProfile,
} from "../controllers/user.controller.js";
import { verifyAuth } from "../middlewares/auth.middleware.js";
import { ROLES } from "../utils/constants.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/profile/:id", getSingleUser);
router.get("/current-user", verifyAuth(Object.values(ROLES)), getCurrentUser);

router.put(
  "/update",
  verifyAuth(Object.values(ROLES)),
  upload.single("avatar"),
  updateProfile
);

router.get(
  "/notifications",
  verifyAuth(Object.values(ROLES)),
  getNotifications
);
router.put(
  "/read-notifications",
  verifyAuth(Object.values(ROLES)),
  readNotifcations
);

// Incomplete
router.delete("/delete/:id", verifyAuth(Object.values(ROLES)), deleteUser);

export default router;
