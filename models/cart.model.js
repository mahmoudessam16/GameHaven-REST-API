import mongoose from "mongoose"; //

const cartItemSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.ObjectId,
      ref: "Game",
      required: [true, "Cart item must belong to a game!"],
    },
    quantity: {
      type: Number,
      required: [true, "Cart item must have a quantity!"],
      min: 1,
    },
    priceAtAddToCart: {
      // Store price at the time of adding to cart to prevent price changes affecting old carts
      type: Number,
      required: [true, "Price at add to cart is required!"],
      min: 0,
    },
  },
  { _id: false }
); // Do not create a separate _id for subdocuments if not explicitly needed

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a user!"],
      unique: true,
    },
    items: [cartItemSchema],
  },
  {
    timestamps: true,
  }
);

// Calculate total cost virtually
cartSchema.virtual("totalCost").get(function () {
  return this.items.reduce(
    (acc, item) => acc + item.quantity * item.priceAtAddToCart,
    0
  );
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
