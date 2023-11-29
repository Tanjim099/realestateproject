import blogModel from "../models/blogModel.js";
import ApiError from "../utils/ApiError.js";
import slugify from "slugify";
import uploadCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";


//create blog
export const createBlog = async (req, res, next) => {
    try {
        const { title, category, description, content, author } = req.body;
        if (!title || !category || !description || !content) {
            return next(ApiError(400, "All Fields are required"));
        }
        const blog = await blogModel.create({
            title,
            slug: slugify(title),
            category,
            description,
            content,
            author,
            image: {
                public_id: "DUMMY",
                secure_url: "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
            }
        });

        let imageLocalPath;
        if (req.file && req.file.path) {
            imageLocalPath = req.file.path
        }

        if (!imageLocalPath) {
            throw new ApiError(400, "Image file is required");
        }

        const image = await uploadCloudinary(imageLocalPath);

        blog.image.public_id = image?.public_id || "DUMMY";
        blog.image.secure_url = image?.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

        await blog.save();

        res.status(201).json(
            new ApiResponse(200, blog, "Blog Create Successfully")
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, error.message));
    }
}

//update blog
export const updateBlog = async (req, res, next) => {

    try {
        const { id } = req.params;
        const { title, category, description, content } = req.body;
        if (!id) {
            return next(new ApiError(403, 'Blog id not found,Please try again later'));
        }
        const blog = await blogModel.findById({ _id: id });
        if (!blog) {
            return next(new ApiError(402, 'Blog is not found...'));
        }
        const updateBlog = await blogModel.findByIdAndUpdate(id, {
            title,
            slug: slugify(title),
            category,
            description,
            content,
            image: {
                public_id: "DUMMY",
                secure_url: "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
            }
        }, { new: true })

        if (!updateBlog) {
            return next(new ApiError(403, 'Failed to update Blog...'));

        }
        let imageLocalPath;
        if (req.file && req.file.path) {
            imageLocalPath = req.file.path
        }

        const image = await uploadCloudinary(imageLocalPath);

        updateBlog.image.public_id = image?.public_id || "DUMMY";
        updateBlog.image.secure_url = image?.secure_url || "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg";

        await updateBlog.save();

        res.status(201).json(
            new ApiResponse(200, updateBlog, "Blog updated Successfully")
        )

    } catch (error) {
        console.log(error)
        next(new ApiError(500, error.message));
    }
}

//get all blog
export const getAllBlog = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const blogs = await blogModel.find().populate("author").limit(limit * 1).skip(page - 1).sort({ createdAt: -1 }).exec();
        const total = await blogModel.countDocuments();
        const allBlog = {
            total,
            blogs
        }
        res.status(201).json(
            new ApiResponse(200, allBlog, "All Blog fetched successfully")
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, error.message));
    }
}

//get single blog
export const getBlog = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const blog = await blogModel.findOne({ slug: slug }).populate("author");
        res.status(201).json(
            new ApiResponse(200, blog, "Blog fetched successfully")
        )
    } catch (error) {
        console.log(error)
        next(new ApiError(500, error.message));
    }
}