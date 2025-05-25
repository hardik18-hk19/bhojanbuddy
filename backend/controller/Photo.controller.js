import Photo from "../model/Photo.js";
import DailyNutrition from "../model/DailyNutrition.js";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";
import visionClient from "../config/visionsetup.js";

export const upload = multer({ dest: "uploads/" });

// Load the nutrition DB once at the top
const nutritionDbPath = path.join(process.cwd(), "nutrition_db.json");
const nutritionDb = JSON.parse(fs.readFileSync(nutritionDbPath, "utf-8"));

export const uploadDailyPhoto = async (req, res) => {
  try {
    // Step 1: Get the uploaded file path
    const originalPath = path.join(process.cwd(), "uploads", req.file.filename);

    // Step 2: Use Vision API to get the main label
    const [result] = await visionClient.labelDetection(originalPath);
    const labels = result.labelAnnotations;
    const mainLabel = labels?.[0]?.description || "unknown";
    // Normalize the label for filename (e.g., "Aloo Gobi" -> "aloo_gobi")
    const normalizedLabel = mainLabel.toLowerCase().replace(/\s+/g, "_");

    // Step 3: Rename the file
    const ext = path.extname(req.file.originalname) || ".jpg";
    const newFilename = `${normalizedLabel}_${Date.now()}${ext}`;
    const newPath = path.join(process.cwd(), "uploads", newFilename);
    fs.renameSync(originalPath, newPath);

    // Copy to frontend/uploads as well
    const frontendUploadsDir = path.join(
      process.cwd(),
      "..",
      "frontend",
      "public",
      "uploads"
    );
    if (!fs.existsSync(frontendUploadsDir)) {
      fs.mkdirSync(frontendUploadsDir, { recursive: true });
    }
    const frontendPath = path.join(frontendUploadsDir, newFilename);
    fs.copyFileSync(newPath, frontendPath);

    // Step 4: Save photo record with new filename
    const photo = await Photo.create({
      user: req.userId,
      url: `/uploads/${newFilename}`,
    });

    // Step 5: (Optional) Send to ML Flask API if needed
    // ...your ML code here...

    // After saving the photo and getting labels, also fetch nutrition info
    let nutrition = null;
    if (labels && labels.length > 0) {
      for (const label of labels) {
        const normalized = label.description.toLowerCase().replace(/\s+/g, "_");
        if (nutritionDb[normalized]) {
          const { serving_size, ...rest } = nutritionDb[normalized];
          nutrition = rest;
          break;
        }
      }
    }

    res.json({
      success: true,
      photo: {
        url: `/uploads/${newFilename}`,
        label: mainLabel,
      },
      labels,
      nutrition,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
