import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

// Middleware function to verify JWT token
export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Retrieve JWT token from cookies or headers
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // Check if token exists
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Find user associated with the token
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // If user doesn't exist, throw error
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Set user data in request object for further middleware or routes
        req.user = user;
        next();
    } catch (error) {
        // Throw error with appropriate status code and message
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
