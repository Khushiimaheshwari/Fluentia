import { generateStreamToken } from "../lib/stream.js";

/**
 * Controller: getStreamToken
 * Purpose: Generate a Stream authentication token for the logged-in user.
 * This token is required by the client (frontend) to connect securely
 * to Stream’s Chat/Video services.
 */

export async function getStreamToken(req, res) {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const token = generateStreamToken(req.user._id);
        
        if (!token) {
            return res.status(500).json({ message: "Failed to generate token" });
        }

        res.status(200).json({ token });
    } catch (error) {
        console.error("Error in getStream controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
