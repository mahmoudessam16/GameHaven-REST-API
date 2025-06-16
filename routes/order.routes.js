import express from "express";
import {
  createOrder,
  getUserOrderHistory,
} from "../controllers/order.controller.js";
import auth from "../middlewares/authMiddleware.js"; // The auth middleware from provided file

const router = express.Router();

// All order routes require authentication
router.use(auth);

router.route("/").post(createOrder); // Place an order from cart

router
  .route("/history") // Get user's order history (extra credit)
  .get(getUserOrderHistory);

export default router;
