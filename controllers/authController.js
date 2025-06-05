import { validationResult } from "express-validator";
import authService from "../services/user.service.js";

// Register Controller
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userName, email, password, role } = req.body;

  try {
    const { token, user } = await authService.register({
      userName,
      email,
      password,
      role,
    });
    return res.status(201).json({
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    if (error.message === "User already exists") {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

// Login Controller
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const { token, user } = await authService.login({ email, password });
    return res.status(200).json({
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    if (error.message === "Invalid Email and Password") {
      return res.status(400).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { register, login };
