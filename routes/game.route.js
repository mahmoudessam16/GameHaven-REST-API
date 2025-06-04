import {
  getGames,
  createNewGame,
  getAGameById,
  updateGameById,
  deleteGameById,
} from "../controllers/game.controller.js";
import {
  gameValidation,
  validateGame,
} from "../middlewares/validateGame.middleware.js";
import express from "express";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const filter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and GIF are allowed."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter: filter });
router
  .route("/")
  .get(getGames)
  .post(
    upload.single("coverImage"),
    gameValidation,
    validateGame,
    createNewGame
  );

router
  .route("/:id")
  .get(getAGameById)
  .put(
    upload.single("coverImage"),
    gameValidation,
    validateGame,
    updateGameById
  )
  .delete(deleteGameById);

export default router;
