import express from "express";
import { upload, uploadDailyPhoto } from "../controller/Photo.controller.js";
import getUserData from "../middleware/userAuth.js";

const router = express.Router();
router.post(
  "/upload-daily",
  getUserData,
  upload.single("photo"), // field name must be "photo"
  uploadDailyPhoto
);
export default router;
