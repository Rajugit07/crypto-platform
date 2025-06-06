import mongoose from "mongoose";
import "dotenv";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
