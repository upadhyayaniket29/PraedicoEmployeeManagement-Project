import express from "express";
import { getMyTasks, submitTask, getTaskSubmission } from "../Controllers/TaskController.js";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../Middlewares/RoleMiddleware.js";

const router = express.Router();

router.use(protect);

// Employee routes
router.get("/my-tasks", authorizeRoles("EMPLOYEE", "ADMIN"), getMyTasks);
router.post("/submit", authorizeRoles("EMPLOYEE", "ADMIN"), submitTask);
router.get("/submissions/:taskId", authorizeRoles("EMPLOYEE", "ADMIN"), getTaskSubmission);

export default router;
