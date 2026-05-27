import mongoose from "mongoose";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const maskMongoUrl = (url) => {
  try {
    const u = new URL(url);
    const host = u.host || u.hostname;
    const user = u.username ? `${u.username}:***@` : "";
    return `${u.protocol}//${user}${host}${u.pathname || ""}${u.search || ""}`;
  } catch {
    return "(invalid URL)";
  }
};

const connectDB = async ({ retries = 3, backoffMs = 1500 } = {}) => {
  const mongoUrl = process.env.MONGODB_URL;
  if (!mongoUrl) throw new Error("MONGODB_URL is not set in environment");

  const shortUrl = maskMongoUrl(mongoUrl);
  console.log(`Connecting to MongoDB: ${shortUrl}`);

  let attempt = 0;
  while (attempt < retries) {
    try {
      attempt += 1;
      console.log(`MongoDB connect attempt ${attempt}/${retries}...`);

      await mongoose.connect(mongoUrl, {
        serverSelectionTimeoutMS: 10000,
        connectTimeoutMS: 10000,
      });

      console.log("✓ MongoDB Connected successfully");
      console.log(`✓ Connected to database: ${mongoose.connection.name}`);
      return true;
    } catch (error) {
      console.error(`✗ Attempt ${attempt} failed:`, error.message || error);
      if (attempt >= retries) {
        console.error("✗ MongoDB Connection Failed after retries.");
        console.error("✗ Make sure:");
        console.error("  1. MongoDB credentials in .env are correct");
        console.error("  2. Your IP is whitelisted in MongoDB Atlas");
        console.error("  3. Network connection is working");
        console.error(error.stack || error);
        throw error;
      }

      const wait = backoffMs * attempt;
      console.log(`Waiting ${wait}ms before retrying...`);
      await sleep(wait);
    }
  }
};

export default connectDB;