import Task from "../Models/Task.js";
import TaskSubmission from "../Models/TaskSubmission.js";
import Counter from "../Models/Counter.js";

// Get tasks assigned to the current employee
export const getMyTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Submit a task report
export const submitTask = async (req, res) => {
    try {
        const { taskId, title, description, attachment } = req.body;

        // Generate submittedId
        const counter = await Counter.findOneAndUpdate(
            { id: "submittedId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const submittedId = `SUB-${counter.seq}`;

        const submission = await TaskSubmission.create({
            task: taskId,
            employee: req.user._id,
            title,
            description,
            attachment,
            submittedId,
        });

        // Update task status to Completed or Work In Progress if needed
        // For now, let's just keep it simple as per user request (focusing on fields)

        res.status(201).json({ success: true, data: submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get submission for a specific task
export const getTaskSubmission = async (req, res) => {
    try {
        const submission = await TaskSubmission.findOne({
            task: req.params.taskId,
            employee: req.user._id
        });
        res.status(200).json({ success: true, data: submission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
