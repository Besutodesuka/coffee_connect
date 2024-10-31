import mongoose from 'mongoose'

export const connectMongoDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI,
            {
                user: process.env.MONGODB_USER,
                pass: process.env.MONGODB_PASSWORD
            }
            // 
        );
        console.log("Connected to MongoDB");

    } catch(error) {
        console.log("Error connecting to MongoDB: ", error);
    }
}