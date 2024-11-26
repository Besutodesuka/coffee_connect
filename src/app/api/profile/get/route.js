import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route.js";
import { connectMongoDB } from "/lib/mongodb";
import User from "/models/user";

export async function GET(req) {
  try {
    // Connect to the database
    await connectMongoDB();

    // Get the session using the correct method for Next.js 13+
    const session = await getServerSession(authOptions);

    console.log("Session User Email:", session?.user?.email);

    // If there's no session, return unauthorized
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user by email from the session
    const user = await User.findOne({ email: session.user.email }).lean();
    console.log(user);

    // If no user is found, return not found
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the user data if found
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
