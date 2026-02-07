import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN", "EMPLOYEE"], default: "USER" },
    designation: { type: String },
    category: { type: String },
    employeeType: { type: String },
    temporaryType: { type: String },
    phoneNumber: { type: String },
    reportingManager: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    employeeId: { type: String, unique: true, sparse: true },
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: true },
    isSeniorEmployee: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  { timestamps: true },
);

export default mongoose.model("User", userSchema);
