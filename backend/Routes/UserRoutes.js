import express from "express";
import { getAllUsers, getUsersStats } from "../Controllers/UserController.js";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../Middlewares/RoleMiddleware.js";

const router = express.Router();

// Apply protection to all routes in this file
router.use(protect);
router.use(authorizeRoles("ADMIN"));

router.get("/all", getAllUsers);
router.get("/stats", getUsersStats);

export default router;
