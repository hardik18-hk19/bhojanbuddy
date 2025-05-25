import userModel from "../model/User.js";
import HealthCondition from "../model/HealthCondition.js";
import Goal from "../model/Goal.js";
import fs from "fs";
import path from "path";
import multer from "multer";

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: storage });

// Get user profile with populated refs
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId;
    const user = await userModel
      .findById(userId)
      .populate("health")
      .populate("goals"); // REMOVE .populate("devices")

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    return res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        health: user.health,
        goals: user.goals,
        // REMOVE: devices: user.devices,
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

// Setup or update user profile
export const setupUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let avatarUrl = "";

    // Handle avatar upload
    if (req.file) {
      avatarUrl = `/uploads/${req.file.filename}`;
    }

    // Parse fields from form-data
    const healthData = req.body.health ? JSON.parse(req.body.health) : {};
    const goalData = req.body.goals ? JSON.parse(req.body.goals) : {};
    // REMOVE: const deviceArray = req.body.devices ? JSON.parse(req.body.devices) : [];

    // Create or update HealthCondition
    let health = await HealthCondition.findOneAndUpdate(
      { user: userId },
      { ...healthData, user: userId },
      { upsert: true, new: true }
    );

    // Create or update Goal
    let goals = await Goal.findOneAndUpdate(
      { user: userId },
      { ...goalData, user: userId },
      { upsert: true, new: true }
    );

    // REMOVE device logic:
    // await Device.deleteMany({ user: userId });
    // const devices = await Device.insertMany(
    //   deviceArray.map((d) => ({ user: userId, ...d }))
    // );

    // Update user document
    const updateData = {
      health: health._id,
      goals: goals._id,
      // REMOVE: devices: devices.map((d) => d._id),
    };
    if (avatarUrl) updateData.avatar = avatarUrl;

    const user = await userModel
      .findByIdAndUpdate(userId, updateData, {
        new: true,
      })
      .populate("health")
      .populate("goals");
    // REMOVE .populate("devices")

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Standalone photo upload (not profile avatar)
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    return res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
      message: "Photo uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
