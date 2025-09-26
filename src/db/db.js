import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DB is connected")
    } catch (error) {
        console.log("Error connecting DB:", error.message)
        process.exit(1)
    }
}