import { NextResponse } from "next/server";
import { connectMongoDB } from '../../../../../lib/mongodb'; // Adjust this path as needed
import Cart from "../../../../../models/cart"; // Adjust this path if necessary

// Handle DELETE requests
export async function DELETE(req) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    console.log("Received userId:", userId);

    if (!userId) {
        return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    try {
        // Ensure MongoDB is connected
        await connectMongoDB();

        // Delete all items from the user's cart
        const result = await Cart.deleteMany({ userId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "No cart found for this user" }, { status: 404 });
        }

        return NextResponse.json({ message: "Cart cleared successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error clearing cart:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
