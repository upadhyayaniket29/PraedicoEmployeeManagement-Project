import express from "express";
import { protect } from "../Middlewares/AuthMiddleware.js";
import { authorizeRoles } from "../Middlewares/RoleMiddleware.js";
import { 
    createTask, 
    getAllTasks, 
    updateTask, 
    deleteTask, 
    getAllSubmissions, 
    getTaskSubmissions, 
    approveSubmission 
} from "../Controllers/AdminTaskController.js";

const router = express.Router();

router.use(protect);
router.use(authorizeRoles("ADMIN"));

// Task Management
router.post("/tasks/create", createTask);           // Create new task
router.get("/tasks/all", getAllTasks);              // View all tasks
router.put("/tasks/:taskId", updateTask);           // Update task status
router.delete("/tasks/:taskId", deleteTask);        // Delete task

// Submission Management
router.get("/submissions/all", getAllSubmissions);  // View all submissions
router.get("/submissions/:taskId", getTaskSubmissions); // View submissions for specific task
router.put("/submissions/:submissionId/approve", approveSubmission); // Approve submission

export default router;
