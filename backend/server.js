import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";

import errorHandler from "./middlewares/errorHandler.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ["https://hoppscotch.io", "http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is working"));

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.use((req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
});

app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

app.listen(PORT, () => console.log(`Server listening to port ${PORT}...`));
