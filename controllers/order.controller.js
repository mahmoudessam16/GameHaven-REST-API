import { placeOrder, getOrderHistory } from "../services/order.service.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;

    const order = await placeOrder(userId);
    res.status(201).json({
      status: "success",
      message: "Order placed successfully!",
      data: {
        order,
      },
    });
  } catch (error) {
    res
      .status(
        error.message.includes("cart is empty") ||
          error.message.includes("stock")
          ? 400
          : 500
      )
      .json({
        status: "error",
        message: error.message,
      });
  }
};

const getUserOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await getOrderHistory(userId);
    res.status(200).json({
      status: "success",
      results: orders.length,
      data: {
        orders,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { createOrder, getUserOrderHistory };
