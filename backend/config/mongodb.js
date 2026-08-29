import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("DB Connected");
        });

        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "ecommerce",
        });;

       
    } catch (error) {
        console.error("MongoDB Error:", error);
        throw error;
    }
};

export default connectDB;