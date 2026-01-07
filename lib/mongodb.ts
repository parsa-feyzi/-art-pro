const uri = process.env.MONGODB_URI;
import mongoose from "mongoose"

if (!uri) throw new Error("MONGODB_URI is not defined");

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    console.log("Already connected to the database");
    return false;
  }
  try {
    await mongoose.connect(uri, { dbName: "art-pro" });
    isConnected = true
    console.log("Connect to the database successfully :)")
  } catch (error) {
    console.log("Error connecting to the database", error);
    process.exit(1)
  }
};
