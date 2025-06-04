import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.config.js";
import router from "./routes/game.route.js";
import morgan from "morgan";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/games", router);

const PORT = process.env.PORT || 3000;
connectDB().then(
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  })
);
