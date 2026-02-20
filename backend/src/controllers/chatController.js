import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        // use clerkId for Stream (not mongoDB _id) => it should match the id we have in the stream dashboard
        const token = chatClient.createToken(req.user.clerkId);

        res.status(200).json({ 
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        });
    } catch (error) {
        console.error("Error generating Stream token:", error.message);
        return res.status(500).json({ message: "Failed to generate token" });
    }

}