import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 1011;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB()