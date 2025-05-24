import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/dbConnect.js";
import authRouter from "./routes/AuthRoutes.js";
import userRouter from "./routes/userRoutes.js";

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

//Api Endpoints
app.get("/", (req, res) => {
  res.send("Api Working fine");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`Server Started on Port ${port}`);
});
