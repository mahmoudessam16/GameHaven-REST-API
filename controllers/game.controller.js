import {
  getAllGames,
  getGameById,
  updateGame,
  deleteGame,
  createGame,
} from "../services/game.service.js";

const getGames = async (req, res) => {
  try {
    const filters = req.query;
    const pagination = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const result = await getAllGames(filters, pagination);
    res.status(200).json({
      status: "success",
      data: {
        games: result.games,
        pagination: result.pagination,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getAGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await getGameById(gameId);
    res.status(200).json({
      status: "success",
      data: {
        game,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

const createNewGame = async (req, res) => {
  try {
    const gameData = req.body;
    if (req.file) {
      gameData.coverImage = req.file.filename;
    }
    const newGame = await createGame(gameData);
    res.status(201).json({
      status: "success",
      data: {
        game: newGame,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const gameData = req.body;
    if (!gameId) {
      return res.status(400).json({
        status: "error",
        message: "Game ID is required for updating",
      });
    }
    if (req.file) {
      gameData.coverImage = req.file.filename;
    }
    const updatedGame = await updateGame(gameId, gameData);
    res.status(200).json({
      status: "success",
      data: {
        game: updatedGame,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await deleteGame(gameId);
    res.status(200).json({
      status: "success",
      message: "Game deleted successfully",
      data: {
        game,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
};

export {
  getGames,
  createNewGame,
  getAGameById,
  updateGameById,
  deleteGameById,
};
