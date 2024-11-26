import { connectMongoDB } from '../../../../lib/mongodb';
import Cart from '../../../../models/cart';

export async function POST(req) {
  await connectMongoDB(); // Connect to the database

  try {
    const { userId, productId, quantity } = await req.json(); // Get JSON from the request body

    // Validate the request body
    if (!userId || !productId || typeof quantity !== "number") {
      return new Response(
        JSON.stringify({ message: "Invalid input" }),
        { status: 400 }
      );
    }

    // Check if the cart item already exists
    let cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      // If the item exists, update its quantity
      cartItem.quantity += quantity;
      await cartItem.save();
      return new Response(
        JSON.stringify({ message: "Cart updated successfully", cartItem }),
        { status: 200 }
      );
    } else {
      // If it doesn't exist, create a new cart item
      cartItem = new Cart({ userId, productId, quantity });
      await cartItem.save();
      return new Response(
        JSON.stringify({ message: "Item added to cart", cartItem }),
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error in add to cart API:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
