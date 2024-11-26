import { connectMongoDB } from '../../../../../lib/mongodb';
import Cart from '../../../../../models/cart';

export async function GET(req) {
    await connectMongoDB(); // Connect to the database
  
    try {
      const { searchParams } = new URL(req.url);
      const userId = searchParams.get("userId"); // Get userId from query params
  
      if (!userId) {
        return new Response(
          JSON.stringify({ message: "UserId is required" }),
          { status: 400 }
        );
      }
  
      // Query database for the user's cart items
      const cartItems = await Cart.find({ userId }).populate("productId"); // Populate product details
      return new Response(JSON.stringify(cartItems), { status: 200 });
    } catch (error) {
      console.error("Error in fetch cart API:", error);
      return new Response(
        JSON.stringify({ message: "Internal server error" }),
        { status: 500 }
      );
    }
  }
  