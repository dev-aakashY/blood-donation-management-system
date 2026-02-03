import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import net from "net";
import morgan from "morgan";
import donorsRouter from "./routes/donors.js";
import { connectDB } from "./config/db.js";
import { Donor } from "./models/Donor.js";
import { User } from "./models/User.js";

// Resolve .env from either /server/.env or project-root/.env so it works no matter
// where the script is launched from.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localEnv = path.resolve(__dirname, "../.env");
const rootEnv = path.resolve(__dirname, "../../.env");
if (fs.existsSync(localEnv)) {
  dotenv.config({ path: localEnv });
}
if (fs.existsSync(rootEnv)) {
  dotenv.config({ path: rootEnv, override: false });
}

async function findAvailablePort(preferredPort) {
  // Try preferred port first
  const preferred = await new Promise((resolve, reject) => {
    const tester = net.createServer()
      .once("error", (err) => {
        if (err.code === "EADDRINUSE") return resolve(null);
        reject(err);
      })
      .once("listening", () => {
        tester.close(() => resolve(preferredPort));
      })
      .listen(preferredPort);
  });

  if (preferred) return preferred;

  // Fallback: ask OS for any free port
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.once("listening", () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.listen(0);
  });
}

const app = express();
const desiredPort = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// Friendly root route so visiting http://localhost:5000/ doesn't return 404
app.get("/", (_req, res) => {
  res.json({
    status: "Blood Donation API",
    message: "API is running",
    routes: {
      health: "/health",
      donors: "/api/donors"
    }
  });
});

app.use("/api/donors", donorsRouter);

async function start() {
  try {
    await connectDB(process.env.MONGO_URI);

    // Seed a few donors if database is empty, so the UI has data to show.
    const count = await Donor.countDocuments();
    if (count === 0) {
      await Donor.insertMany([
        { name: "Aarav Sharma", bloodGroup: "A+", phone: "+91-9876543210", email: "aarav@example.com", city: "Delhi", state: "Delhi", available: true },
        { name: "Priya Verma", bloodGroup: "B+", phone: "+91-9123456780", email: "priya@example.com", city: "Mumbai", state: "Maharashtra", available: true },
        { name: "Rahul Mehta", bloodGroup: "O-", phone: "+91-9988776655", email: "rahul@example.com", city: "Bengaluru", state: "Karnataka", available: false },
        { name: "Sneha Rao", bloodGroup: "AB+", phone: "+91-9090909090", email: "sneha@example.com", city: "Hyderabad", state: "Telangana", available: true },
        { name: "Vikram Singh", bloodGroup: "A-", phone: "+91-9012345678", email: "vikram@example.com", city: "Chandigarh", state: "Chandigarh", available: true }
      ]);
      console.log("Seeded starter donors (5 records)");
    }

    // Seed a dummy user for testing login
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        role: "Organizer"
      });
      console.log("Seeded dummy user: test@example.com / password123");
    }

    const port = await findAvailablePort(desiredPort);
    if (port !== desiredPort) {
      console.warn(`Port ${desiredPort} is in use. Started on ${port} instead.`);
    }

    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (err) {
    console.error("Startup error", err);
    process.exit(1);
  }
}

start();
