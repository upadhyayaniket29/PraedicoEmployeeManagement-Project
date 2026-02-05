import User from "../Models/User.js";

/**
 * @desc    Get all users with pagination, search, and filters
 * @route   GET /api/users/all
 * @access  Private (Admin only)
 */
export const getAllUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const { search, role, status } = req.query;

        let query = {};

        // Search filter
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } },
            ];
        }

        // Role filter
        if (role && role !== "all") {
            let backendRole = role.toUpperCase();
            if (backendRole === "USER") backendRole = "USER";
            if (backendRole === "ADMIN") backendRole = "ADMIN";
            // Handle frontend "employee" vs backend "EMPLOYEE" (it's already handled by toUpperCase, but being explicit)
            query.role = backendRole;
        }

        // Status filter
        if (status && status !== "all") {
            if (status === "active") {
                query.isActive = true;
            } else if (status === "inactive") {
                query.isActive = false;
            }
            // Note: "unverified" status could be added if you have an isVerified field
        }

        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .select("-password")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            users,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

/**
 * @desc    Get user statistics
 * @route   GET /api/users/stats
 * @access  Private (Admin only)
 */
export const getUsersStats = async (req, res) => {
    try {
        // One-time fix: Ensure all users have isActive and isVerified
        // This handles users created before these fields were added
        await User.updateMany(
            { isActive: { $exists: false } },
            { $set: { isActive: true } }
        );
        await User.updateMany(
            { isVerified: { $exists: false } },
            { $set: { isVerified: true } }
        );

        const totalUsers = await User.countDocuments({});

        // Total Active: isActive is true OR missing (already fixed above, but being safe)
        const activeUsers = await User.countDocuments({
            isActive: true,
            isVerified: { $ne: false }
        });

        // Inactive: isActive is true but isVerified is explicitly false
        const inactiveUsers = await User.countDocuments({
            isActive: true,
            isVerified: false
        });

        // Blocked: isActive is explicitly false
        const blockedUsers = await User.countDocuments({
            isActive: false
        });

        // Registered Users: Let's count only the ones with role 'USER'
        // since 'EMPLOYEE' and 'ADMIN' are specialized
        const registeredUsers = await User.countDocuments({
            role: "USER"
        });

        console.log("Stats Refresh:", {
            totalUsers,
            activeUsers,
            inactiveUsers,
            blockedUsers,
            registeredUsers
        });

        res.status(200).json({
            success: true,
            stats: {
                totalUsers,
                activeUsers,
                inactiveUsers,
                blockedUsers,
                registeredUsers,
            },
        });
    } catch (error) {
        console.error("Get Users Stats Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};
