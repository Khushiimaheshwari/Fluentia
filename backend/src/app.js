import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const corsOrigins = [
    "http://localhost:3000",
    "https://fluentia-frontend-steel.vercel.app",
];

if (process.env.FRONTEND_URL) {
    process.env.FRONTEND_URL.split(",")
        .map((url) => url.trim())
        .filter(Boolean)
        .forEach((url) => {
            if (!corsOrigins.includes(url)) {
                corsOrigins.push(url);
            }
        });
}

const app = express();

app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error("Database connection failed:", error);
        res.status(500).json({ message: "Database connection failed" });
    }
});

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || corsOrigins.includes(origin)) {
                callback(null, origin);
            } else {
                callback(new Error(`Not allowed by CORS: ${origin}`));
            }
        },
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

export default app;
