import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("✓ MongoDB Connected successfully");
    console.log(`✓ Connected to database: ${mongoose.connection.name}`);
    return true;
  } catch (error) {
    console.error("✗ MongoDB Connection Failed:", error.message);
    console.error("✗ Make sure:");
    console.error("  1. MongoDB credentials in .env are correct");
    console.error("  2. Your IP is whitelisted in MongoDB Atlas");
    console.error("  3. Network connection is working");
    process.exit(1);
  }
};

export default connectDB;