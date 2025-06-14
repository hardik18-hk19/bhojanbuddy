import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/userRoutes.js";
import photoRoutes from "./routes/photoRoutes.js";
import PredictRoutes from "./routes/PredictRoutes.js";
import path from "path";

const app = express();

const port = process.env.PORT || 4000;
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_WEBSITE_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

//Api Endpoints
app.get("/", (req, res) => {
  res.send("Api Working fine");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/photo", photoRoutes);
app.use("/api", PredictRoutes);

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
