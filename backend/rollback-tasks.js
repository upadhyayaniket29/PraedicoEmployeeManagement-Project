import mongoose from "mongoose";
import dotenv from "dotenv";
import Task from "./Models/Task.js";
import path from "path";
import { fileURLToPath } from "url";
import dns from 'dns';

// Set DNS to use system DNS instead of localhost
dns.setServers(['8.8.8.8', '8.8.4.4']);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const rollbackTasks = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const result = await Task.deleteMany({});
        console.log(`Deleted ${result.deletedCount} tasks from the database.`);

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (err) {
        console.error("Error rolling back tasks:", err);
    }
};

rollbackTasks();
