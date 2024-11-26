import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { connectMongoDB } from "/lib/mongodb";
import User from "/models/user";

export async function POST(req) {
  await connectMongoDB(); // Connect to MongoDB
  try {
    const { firstName, lastName, address } = await req.json(); // Destructure address as well

    console.log("Received data in backend:", { firstName, lastName, address }); // Log received data

    // Validate that at least one of firstName, lastName, or address is provided
    if (!firstName && !lastName && !address) {
      return NextResponse.json(
        { error: "Either first name, last name, or address is required" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions); // Get session to verify user

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find the user by email
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (firstName) user.firstname = firstName;
    if (lastName) user.lastname = lastName;
    if (address) user.location = address; 

    await user.save(); // Save updated user data to database

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
