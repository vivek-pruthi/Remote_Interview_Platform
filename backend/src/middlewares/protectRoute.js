import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;

            if (!clerkId) return res.status(404).json({ msg: "Unauthorized - invalid token" });
            
            // find user in db using clerkId
            const user = await User.findOne({ clerkId });
            if (!user) return res.status(404).json({ msg: "User not found" });
        
            // attach user to request object for use in next middlewares or route handlers
            req.user = user;

            next();

        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            res.status(500).json({ msg: "Server error in authentication" });
        }
    },
];