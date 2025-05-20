import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    height: {
      type: Number, // in cm
      required: false,
    },
    weight: {
      type: Number, // in kg
      required: false,
    },
    // Reference to HealthCondition documents
    healthConditions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "HealthCondition" },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
