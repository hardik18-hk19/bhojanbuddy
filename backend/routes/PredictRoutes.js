import express from "express";
import multer from "multer";
import { predictFood } from "../controller/Predict.controller.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/predict", upload.single("image"), predictFood);

export default router;
