import userModel from "../model/User.js";
import fs from "fs";
import path from "path";
import multer from "multer";

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
export const upload = multer({ storage: storage });

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId || req.body?.userId;
    const user = await userModel.findById(userId);

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
        health: user.health, // Should include conditions, weight, height, bmi, bloodSugar, bloodPressure
        goals: user.goals, // calories, carbs, protein, fat, sugar, sodium
        devices: user.devices, // Array of connected devices
      },
    });
  } catch (error) {
    return res.json({
      success: false,
      error: error.message,
    });
  }
};

export const setupUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    let avatarUrl = "";

    if (req.file) {
      // Cartoonize and save the image, set avatarUrl
      avatarUrl = `/uploads/${req.file.filename}`; // or your cartoonized path
    }

    // Parse other fields as needed

    const updateData = {
      /* ...other fields... */
    };
    if (avatarUrl) updateData.avatar = avatarUrl;

    const user = await userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    // You can save the file path to the user profile here if needed
    return res.json({
      success: true,
      url: `/uploads/${req.file.filename}`,
      message: "Photo uploaded successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
