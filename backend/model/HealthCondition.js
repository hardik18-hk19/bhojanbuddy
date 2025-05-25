import mongoose from "mongoose";

const healthConditionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  conditions: [String],
  weight: Number,
  height: Number,
  bmi: Number,
  bloodSugar: Number,
  bloodPressure: String,
});

const HealthCondition =
  mongoose.models.HealthCondition ||
  mongoose.model("HealthCondition", healthConditionSchema);
export default HealthCondition;
