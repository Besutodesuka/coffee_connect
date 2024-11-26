import { NextResponse } from 'next/server';
import { connectMongoDB } from '/lib/mongodb';
import Product from '/models/product'; // Path to your Product model

export async function GET(req, { params }) {
  try {
    // Get the product ID from the URL parameters
    const { id } = params;

    // Connect to MongoDB
    await connectMongoDB();

    // Query the product by its _id using Mongoose's findById method
    const product = await Product.findById(id);

    if (!product) {
      // If no product found, return 404
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    // Return the product data as JSON
    return NextResponse.json(product);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return NextResponse.json(
      { message: 'Failed to fetch product data' },
      { status: 500 }
    );
  }
}
