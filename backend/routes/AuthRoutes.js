import express from "express";
import {
  login,
  logout,
  register,
  sendPasswordResetOtp,
  verifyEmail,
  verifyOtp,
  verifyPasswordReset,
  isAuthenticated,
} from "../controller/Auth.controller.js";
import getUserData from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", getUserData, verifyOtp);
authRouter.post("/verify-account", getUserData, verifyEmail);
authRouter.post("/send-reset-otp", getUserData, sendPasswordResetOtp);
authRouter.post("/password-reset", getUserData, verifyPasswordReset);
authRouter.get("/is-authenticated", isAuthenticated);

export default authRouter;
