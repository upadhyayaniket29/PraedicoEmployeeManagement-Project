import express from "express";
import { register, login, getMe, changePassword, forgotPassword, resetPassword } from "../Controllers/AuthController.js";
import { protect } from "../Middlewares/AuthMiddleware.js";

const router = express.Router();

// Register route
router.post("/register", register);

router.post("/login", login);

// Get current user profile
router.get("/me", protect, getMe);

// Change password
router.post("/change-password", protect, changePassword);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

export default router;

