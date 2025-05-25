import mongoose from "mongoose";

const dailyNutritionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true }, // e.g., "2024-05-25"
  nutrients: {
    calories: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    fat: { type: Number, default: 0 },
    sugar: { type: Number, default: 0 },
    sodium: { type: Number, default: 0 },
    calcium: {
      type: Number,
      default: 0,
    },
    iron: {
      type: Number,
      default: 0,
    },
    saturatedFats: {
      type: Number,
      default: 0,
    },
    fiber: {
      type: Number,

      default: 0,
    },
    cholesterol: {
      type: Number,
      default: 0,
    },

    // add more nutrients as needed
  },
  photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photo" }],
});

dailyNutritionSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyNutrition", dailyNutritionSchema);
