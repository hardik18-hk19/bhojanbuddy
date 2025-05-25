import fs from "fs";
import path from "path";
import visionClient from "../config/visionsetup.js";
import DailyNutrition from "../model/DailyNutrition.js"; // Add this import

// Load the nutrition DB once at the top
const nutritionDbPath = path.join(process.cwd(), "nutrition_db.json");
const nutritionDb = JSON.parse(fs.readFileSync(nutritionDbPath, "utf-8"));

export const predictFood = async (req, res) => {
  try {
    const imagePath = path.resolve(req.file.path);

    // Use Google Vision to detect labels (food guesses)
    const [result] = await visionClient.labelDetection(imagePath);
    const labels = result.labelAnnotations;

    // Find nutrition info for all matching labels
    const nutritionMatches = [];
    let totalNutrients = {
      calories: 0,
      carbs: 0,
      protein: 0,
      fat: 0,
      sugar: 0,
      sodium: 0,
      // add more if your DB has more fields
    };

    if (labels && labels.length > 0) {
      for (const label of labels) {
        const normalized = label.description.toLowerCase().replace(/\s+/g, "_");
        if (nutritionDb[normalized]) {
          const { serving_size, ...rest } = nutritionDb[normalized];
          nutritionMatches.push({
            label: label.description,
            score: label.score,
            nutrition: rest,
          });
          // Sum up nutrients
          Object.keys(totalNutrients).forEach((key) => {
            if (rest[key] !== undefined) {
              totalNutrients[key] += Number(rest[key]);
            }
          });
        }
      }
    }

    // Store in DailyNutrition
    const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
    await DailyNutrition.findOneAndUpdate(
      { user: req.userId, date: today },
      {
        $inc: {
          "nutrients.calories": totalNutrients.calories,
          "nutrients.carbs": totalNutrients.carbs,
          "nutrients.protein": totalNutrients.protein,
          "nutrients.fat": totalNutrients.fat,
          "nutrients.sugar": totalNutrients.sugar,
          "nutrients.sodium": totalNutrients.sodium,
        },
        // Optionally, you can store the image or label info as well
      },
      { upsert: true, new: true }
    );

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      labels: labels.map((label) => ({
        description: label.description,
        score: label.score,
      })),
      nutritionMatches, // array of all matches
      totalNutrients, // what was added to DailyNutrition
    });
  } catch (error) {
    console.error("Vision API error:", error.message);
    res.status(500).json({ error: "Vision API prediction failed" });
  }
};
