import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Game from "../models/game.model.js";
import mongoose from "mongoose";

const placeOrder = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.game");

  if (!cart || cart.items.length === 0) {
    throw new Error(
      "Your cart is empty. Please add items before placing an order."
    );
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const orderItems = [];
    let totalAmount = 0;

    // 1. Check stock and prepare order items
    for (const item of cart.items) {
      const game = item.game; // Populated game object
      if (!game) {
        throw new Error(
          `Game with ID ${item.game._id} not found. Cannot place order.`
        );
      }

      if (game.stock < item.quantity) {
        throw new Error(
          `Not enough stock for "${game.title}". Available: ${game.stock}, Requested: ${item.quantity}`
        );
      }

      orderItems.push({
        game: game._id,
        quantity: item.quantity,
        price: game.price, // Use current game price at order time
        title: game.title, // Store title for historical record
      });
      totalAmount += item.quantity * game.price;

      // 2. Deduct quantities from stock
      await Game.findByIdAndUpdate(
        game._id,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    // 3. Create the order
    const order = await Order.create(
      [
        {
          user: userId,
          orderItems: orderItems,
          totalAmount: totalAmount,
          status: "completed",
        },
      ],
      { session }
    );

    // 4. Clear the user's cart
    await Cart.deleteOne({ user: userId }, { session });

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getOrderHistory = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate({
      path: "orderItems.game",
      select: "title platform coverImage", // Populate minimal game details for history
    })
    .sort("-orderDate"); // Sort by most recent order first

  return orders;
};

export { placeOrder, getOrderHistory };
