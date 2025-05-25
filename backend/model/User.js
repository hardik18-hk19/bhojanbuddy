import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verifyOTP: { type: String, default: "" },
  verifyOTPexpireAt: { type: Number, default: 0 },
  isAccountVerified: { type: String, default: false },
  resetOtp: { type: String, default: "" },
  resetOtpExpireAt: { type: Number, default: 0 },
  avatar: { type: String, default: "" },
  health: { type: mongoose.Schema.Types.ObjectId, ref: "HealthCondition" },
  goals: { type: mongoose.Schema.Types.ObjectId, ref: "Goal" },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
