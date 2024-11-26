import mongoose from "mongoose";

// Define the Cart Schema
const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // References the User model
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // References the Product model
    quantity: { type: Number, required: true, default: 1 },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create and export the Cart model
const Cart = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
export default Cart;
