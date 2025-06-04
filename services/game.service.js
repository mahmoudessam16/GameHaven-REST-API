import Game from "../models/game.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getAllGames = async (filters, pagination) => {
  const page = parseInt(pagination.page) || 1;
  const limit = parseInt(pagination.limit) || 10;
  const skip = (page - 1) * limit;

  const query = {};
  if (filters.search) {
    query.title = { $regex: filters.search, $options: "i" };
  }
  if (filters.platform) {
    query.platform = filters.platform;
  }
  if (filters.genera) {
    query.genera = filters.genera;
  }

  const games = await Game.find(query).skip(skip).limit(limit);
  const total = await Game.countDocuments(query);

  return {
    games,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getGameById = async (id) => {
  const game = await Game.findById(id);
  if (!game) {
    throw new Error("Game not found");
  }
  return game;
};

const createGame = async (gameData) => {
  try {
    const game = new Game(gameData);
    await game.save();
    return game;
  } catch (error) {
    throw new Error("Error creating game: " + error.message);
  }
};

const updateGame = async (id, gameData) => {
  try {
    // Find the old game only if a new cover image is provided
    let oldCoverImage = null;
    if (gameData.coverImage) {
      const oldGame = await Game.findById(id).select("coverImage");
      if (!oldGame) throw new Error("Game not found");
      oldCoverImage = oldGame.coverImage;
    }

    const game = await Game.findByIdAndUpdate(id, gameData, {
      new: true,
      runValidators: true,
    });

    if (!game) throw new Error("Game not found");

    // Delete the old cover image asynchronously if it changed and is not default
    if (
      oldCoverImage &&
      oldCoverImage !== "default.png" &&
      oldCoverImage !== game.coverImage
    ) {
      const imagePath = path.join(__dirname, "../uploads", oldCoverImage);
      fs.promises.unlink(imagePath).catch((e) => {
        console.error("Error deleting old cover image:", e);
      });
    }

    return game;
  } catch (error) {
    throw new Error("Error updating game: " + error.message);
  }
};

const deleteGame = async (id) => {
  try {
    const game = await Game.findByIdAndDelete(id);

    if (!game) {
      throw new Error("Game not found");
    }
    // delete the cover image if it exists
    if (game.coverImage && game.coverImage !== "default.png") {
      const imagePath = path.join(__dirname, "../uploads", game.coverImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    return game;
  } catch (error) {
    throw new Error("Error deleting game: " + error.message);
  }
};

export { getAllGames, getGameById, createGame, updateGame, deleteGame };
