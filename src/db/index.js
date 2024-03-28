import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"; // Importing the database name from constants

// Function to establish connection to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the provided URI and database name
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        
        // Log a success message along with the host information if the connection is successful
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        // Log an error message if connection fails and exit the process
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectDB;
