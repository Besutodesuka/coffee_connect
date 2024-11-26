import { connectMongoDB } from '../../../../../lib/mongodb';
import Cart from '../../../../../models/cart';

export async function PUT(req) {
    await connectMongoDB(); // Connect to the database
    try {
      const { userId, cartItems } = await req.json(); // Parse request body
      if (!userId || !cartItems) {
        return new Response(
          JSON.stringify({ message: "userId and cartItems are required" }),
          { status: 400 }
        );
      }
  
      // Iterate through the items and update the quantity
      for (const item of cartItems) {
        await Cart.findOneAndUpdate(
          { userId, productId: item.productId },
          { quantity: item.quantity }
        );
      }
  
      return new Response(JSON.stringify({ message: "Cart updated successfully" }), { status: 200 });
    } catch (error) {
      console.error("Error updating cart:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
    }
  }
  