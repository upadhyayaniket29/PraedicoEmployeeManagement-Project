import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Models/User.js";
import Task from "./Models/Task.js";
import dns from 'dns';

// Set DNS to use system DNS instead of localhost
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const checkDb = async () => {
    try {
        console.log("Connecting to:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const specificUser = await User.findOne({ email: "lti.05.aniket@gmail.com" });
        if (specificUser) {
            console.log(`FOUND_USER: ${specificUser.name} | Role: ${specificUser.role} | ID: ${specificUser._id} | Email: ${specificUser.email}`);
        } else {
            console.log("USER_NOT_FOUND for email: lti.05.aniket@gmail.com");
        }

        const users = await User.find({});
        console.log(`Total Users in DB: ${users.length}`);
        users.forEach(u => {
            console.log(`User: ${u.name} | Role: ${u.role} | ID: ${u._id}`);
        });

        const tasks = await Task.find({});
        console.log(`Total Tasks in DB: ${tasks.length}`);
        tasks.forEach(t => {
            console.log(`Task: ${t.title} | AssignedTo: ${t.assignedTo} | Status: ${t.status}`);
        });

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (err) {
        console.error("Error in checkDb:", err);
    }
};

checkDb();
