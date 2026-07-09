import {StreamChat} from "stream-chat";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.STREAM_API_KEY
const apiSecret= process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("Stream API key or Secret is missing");
}

// Create a StreamChat client instance with API key & secret
const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser= async (userData) => {
    try{
        // upsertUsers → If user exists, update info; if not, create a new one
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch (error){
        console.error("Error upserting Stream user:", error);
    }
}

// Function to generate a token for a user
//Token is required for authentication on client-side (frontend).

export const generateStreamToken = (userId) => {
    try{
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error){
        console.error("Error generating Stream Token:", error);
    }

};