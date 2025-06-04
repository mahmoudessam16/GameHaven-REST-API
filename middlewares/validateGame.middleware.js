import { body, validationResult } from "express-validator";

const gameValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  ,
  body("genera")
    .notEmpty()
    .withMessage("Genre is required")
    .isString()
    .withMessage("Genre must be a string"),
  body("platform")
    .notEmpty()
    .withMessage("Platform is required")
    .isString()
    .withMessage("Platform must be a string"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("rating")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
];

const validateGame = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "error",
      errors: errors.array(),
    });
  }
  next();
};
export { gameValidation, validateGame };
