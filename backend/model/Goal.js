import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number,
  sugar: Number,
  sodium: Number,
});

const Goal = mongoose.models.Goal || mongoose.model("Goal", goalSchema);
export default Goal;
