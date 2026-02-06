import express from "express";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { authorizeRoles, authorizeAdminOrManager } from "../Middlewares/RoleMiddleware.js";
import { 
    createTask, 
    getAllTasks, 
    updateTask, 
    deleteTask, 
    getAllSubmissions, 
    getTaskSubmissions, 
    approveSubmission,
    rejectSubmission
} from "../Controllers/AdminTaskController.js";

import upload from "../Middlewares/UploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorizeAdminOrManager);

// Task Management
router.post("/tasks/create", upload.single("attachment"), createTask);           // Create new task
router.get("/tasks/all", getAllTasks);              // View all tasks
router.put("/tasks/:taskId", updateTask);           // Update task status
router.delete("/tasks/:taskId", deleteTask);        // Delete task

// Submission Management
router.get("/submissions/all", getAllSubmissions);  // View all submissions
router.get("/submissions/:taskId", getTaskSubmissions); // View submissions for specific task
router.put("/submissions/:submissionId/approve", approveSubmission); // Approve submission
router.put("/submissions/:submissionId/reject", rejectSubmission); // Reject submission

export default router;
