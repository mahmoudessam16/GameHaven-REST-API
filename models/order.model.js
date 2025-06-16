import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
      required: [true, "Order item must belong to a game!"],
    },
    quantity: {
      type: Number,
      required: [true, "Order item must have a quantity!"],
      min: 1,
    },
    price: {
      // Price at the time of order placement
      type: Number,
      required: [true, "Price at order is required!"],
      min: 0,
    },
    title: {
      // Store game title for historical purposes in case game is deleted
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Order must belong to a user!"],
    },
    orderItems: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: [true, "Order must have a total amount!"],
      min: 0,
    },
    orderDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
