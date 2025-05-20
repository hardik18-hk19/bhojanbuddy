import mongoose from "mongoose";

const healthConditionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // Optionally, you can reference the user who owns this condition
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const HealthCondition = mongoose.model(
  "HealthCondition",
  healthConditionSchema
);

export default HealthCondition;
