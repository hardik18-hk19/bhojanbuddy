import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";

import authRoutes from "./routes/AuthRoute.js";
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 1011;
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
app.get("/", (req, res) => {
  res.send("API is running...");
});
