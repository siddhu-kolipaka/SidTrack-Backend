import mongoose from "mongoose";

const registeredUsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: { type: Date, default: Date.now() },
    isVerified: {
      type: Boolean,
      default: false,
    },
    roles: { type: Array, default: ["user"] },
    isBlacklisted: {
      type: Boolean,
      default: false,
    },
    refreshToken: String,
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true }
);

const registeredUsers = mongoose.model(
  "registeredUsers",
  registeredUsersSchema
);
export default registeredUsers;
