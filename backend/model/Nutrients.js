import mongoose from "mongoose";

const nutrientSchema = mongoose.Schema({
  calories: {
    type: Number,
    required: true,
  },
  protein: {
    type: Number,
    required: true,
  },
  carbs: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
  saturatedFats: {
    type: Number,
    required: true,
  },
  fiber: {
    type: Number,
    required: true,
  },
  sugar: {
    type: Number,
    required: true,
  },
  cholesterol: {
    type: Number,
    required: true,
  },
  sodium: {
    type: Number,
    required: true,
  },
  calcium: {
    type: Number,
    required: true,
  },
  iron: {
    type: Number,
    required: true,
  },
});

const Nutrient = mongoose.model("Nutrient", nutrientSchema);

export default Nutrient;
