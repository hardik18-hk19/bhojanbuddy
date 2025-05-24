import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
  // Optionally: mealType, notes, etc.
});

export default mongoose.model("Photo", photoSchema);
