import mongoose from "mongoose";

const globalCache = globalThis;

let cached = globalCache.mongoose;

if (!cached) {
    cached = globalCache.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.MONGO_URI)
            .then((conn) => {
                console.log(`MongoDB Connected: ${conn.connection.host}`);
                return conn;
            })
            .catch((error) => {
                cached.promise = null;
                console.error("Error in connecting to MongoDB:", error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};
