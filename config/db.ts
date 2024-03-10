import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI: string =
      process.env.MONGO_URI || "mongodb://localhost:27017/test";
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("Error in DB Connection");
    process.exit(1);
  }
};

export default connectDB;
