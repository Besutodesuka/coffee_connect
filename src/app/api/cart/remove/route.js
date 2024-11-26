import { connectMongoDB } from '../../../../../lib/mongodb';
import Cart from '../../../../../models/cart';

export async function DELETE(req) {
  await connectMongoDB(); // Connect to the database
  try {
    const { userId, productId } = await req.json(); // Parse request body
    if (!userId || !productId) {
      return new Response(
        JSON.stringify({ message: "userId and productId are required" }),
        { status: 400 }
      );
    }

    // Remove the item from the cart
    await Cart.findOneAndDelete({ userId, productId });

    return new Response(JSON.stringify({ message: "Item removed successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error removing cart item:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
