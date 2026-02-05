import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./Models/User.js";

dotenv.config();

const checkDb = async () => {
    try {
        console.log("Connecting to:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        const users = await User.find({});
        console.log(`Total Users in DB: ${users.length}`);

        users.forEach(u => {
            console.log(`- ${u.name} (${u.role}): isActive=${u.isActive}, isVerified=${u.isVerified}`);
        });

        const activeCount = await User.countDocuments({ isActive: { $ne: false }, isVerified: { $ne: false } });
        console.log(`Active Users Count (ne false): ${activeCount}`);

        const inactiveCount = await User.countDocuments({ isActive: { $ne: false }, isVerified: false });
        console.log(`Inactive Users Count: ${inactiveCount}`);

        const blockedCount = await User.countDocuments({ isActive: false });
        console.log(`Blocked Users Count: ${blockedCount}`);

        const registeredCount = await User.countDocuments({ role: { $in: ["USER", "EMPLOYEE"] } });
        console.log(`Registered Users Count: ${registeredCount}`);

        // Update all users to have default values if missing
        console.log("Updating missing fields...");
        const result = await User.updateMany(
            { $or: [{ isActive: { $exists: false } }, { isVerified: { $exists: false } }] },
            { $set: { isActive: true, isVerified: true } }
        );
        console.log(`Updated ${result.modifiedCount} users.`);

        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    } catch (err) {
        console.error("Error in checkDb:", err);
    }
};

checkDb();
