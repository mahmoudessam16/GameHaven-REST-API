import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.config.js";
import authRouter from "./routes/authRouter.js";
import gameRouter from "./routes/game.route.js";

import morgan from "morgan";
import loggerMiddleware from "./middlewares/loggerMiddleware.js";
import auth from "./middlewares/authMiddleware.js";
import isAdmin from "./middlewares/roleMiddleWare.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(loggerMiddleware);

// serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/auth", authRouter);
app.use("/api/games", gameRouter);

// default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
