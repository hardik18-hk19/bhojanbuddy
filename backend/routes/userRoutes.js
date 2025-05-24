import express from "express";
import multer from "multer";
import {
  getUserProfile,
  setupUserProfile,
} from "../controller/User.controller.js";
import getUserData from "../middleware/userAuth.js";

const upload = multer({ dest: "uploads/" }); // or configure as needed

const userRouter = express.Router();

userRouter.get("/profile", getUserData, getUserProfile);
userRouter.post(
  "/profile-setup",
  getUserData,
  upload.single("avatar"),
  setupUserProfile
);

export default userRouter;
