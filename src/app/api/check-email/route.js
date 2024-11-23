// /pages/api/check-email.js
import { connectMongoDB } from "/lib/mongodb";
import User from "/models/user";

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email } = req.body;

        try {
            await connectMongoDB();
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(404).json({ message: "Email not found" });
            }

            return res.status(200).json({ message: "Email exists" });
        } catch (error) {
            console.error("Error checking email:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
