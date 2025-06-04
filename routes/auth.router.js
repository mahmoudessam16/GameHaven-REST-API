import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { body } from 'express-validator';

const router = express.Router();

router.post("/register",[
    body("userName").notEmpty().withMessage("UserName is required").isLength({ min: 3 }).withMessage("UserName must be at least 3 characters long"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
],register);

router.post("/login",[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required")
],login);

export default router;