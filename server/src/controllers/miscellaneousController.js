import authModel from "../models/authModel.js";
import blogModel from "../models/blogModel.js";
import Project from "../models/projectModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

//get all users
export const allUsers = async (req, res, next) => {
    const totalUsers = await authModel.countDocuments();
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const users = await authModel.find().skip((page - 1) * limit).limit(limit);
        res.status(201).json({
            success: true,
            message: "Users Fetched Successfully",
            users,
            totalUsers
        })
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ApiError(403, 'User id not found, Please try again later'));
        }
        await authModel.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "User Delete Successfully"
        })
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}

//get all project
export const getAllProjects = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const projects = await Project.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, projects, "Project Fetched Successfully")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}
//get all blogs
export const getAllBlogs = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const blogs = await blogModel.find().skip((page - 1) * limit).limit(limit).populate("author");
        res.status(201).json(
            new ApiResponse(200, blogs, "Blogs Fetched Successfully")
        )
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}