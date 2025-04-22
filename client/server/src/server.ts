import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import tripRoutes from "./routes/tripRoutes.ts";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount the trips API
app.use("/api/trips", tripRoutes);

// Optional: sanity check route
app.get("/", (_req, res) => {
  res.send("Trip Planner API is alive 🚀");
});

const PORT = Number(process.env.PORT) || 5000;
const MONGO_URI = process.env.MONGO_URI!;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });