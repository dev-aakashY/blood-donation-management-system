import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export async function connectDB(uri) {
  let mongoUri = uri;

  if (!mongoUri || mongoUri === "memory") {
    const mem = await MongoMemoryServer.create();
    mongoUri = mem.getUri();
    console.log("Using in-memory MongoDB instance");
  } else {
    // Ensure the connection string has a database name
    // If it doesn't have one (has /? or ends with /), add a default database name
    const dbName = process.env.DB_NAME || "blood_donation";
    
    // Check if database name is missing (connection string has /? or ends with /)
    if (mongoUri.includes('/?')) {
      // Replace /? with /databaseName?
      mongoUri = mongoUri.replace('/?', `/${dbName}?`);
    } else if (mongoUri.endsWith('/')) {
      // Add database name if URI ends with /
      mongoUri = mongoUri + dbName;
    } else if (!mongoUri.match(/\/[^/?]+(\?|$)/)) {
      // If no database name pattern found, add it before query params
      if (mongoUri.includes('?')) {
        mongoUri = mongoUri.replace('?', `/${dbName}?`);
      } else {
        mongoUri = mongoUri + `/${dbName}`;
      }
    }
    console.log("Connecting to MongoDB...");
  }

  mongoose.set("strictQuery", true);
  
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000, // 10 seconds timeout
      socketTimeoutMS: 45000, // 45 seconds socket timeout
    });
    console.log("✅ MongoDB connected successfully");
    console.log(`   Database: ${mongoose.connection.name}`);
    console.log(`   Host: ${mongoose.connection.host}`);
    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    if (error.name === 'MongoServerSelectionError') {
      console.error("   Could not connect to MongoDB server. Please check:");
      console.error("   1. Your internet connection");
      console.error("   2. MongoDB Atlas IP whitelist settings");
      console.error("   3. Your MongoDB connection string in .env file");
    }
    throw error;
  }
}
