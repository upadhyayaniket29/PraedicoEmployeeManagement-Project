/**
 * Role-based access control middleware
 * @param  {...string} allowedRoles
 * @example authorizeRoles("ADMIN")
 */
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        // If user is not authenticated/found
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to perform this action",
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Role authorization failed",
      });
    }
  };
};

/**
 * Access control for Admin OR Managers (Team Leads, etc.)
 */
export const authorizeAdminOrManager = (req, res, next) => {
    try {
        if (!req.user || !req.user.role) {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const managerDesignations = [
            "CEO", "CTO", "COO", "Director", "General Manager",
            "Project Manager", "Product Manager", "Team Lead", "Engineering Manager",
            "Senior Developer"
        ];

        // Allow if ADMIN
        if (req.user.role === "ADMIN") {
            return next();
        }

        // Allow if EMPLOYEE with Manager designation
        if (req.user.role === "EMPLOYEE" && managerDesignations.includes(req.user.designation)) {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: "Access restricted to Admins and Managers only",
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Authorization failed" });
    }
};
