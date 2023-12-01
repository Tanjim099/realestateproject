import authModel from "../models/authModel.js"
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
export const allUsers = async (req, res, next) => {
    const totalUsers = await authModel.countDocuments();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const users = await authModel.find().skip((page - 1) * limit).limit(limit);
        res.status(201).json(
            new ApiResponse(200, users, "Users Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}