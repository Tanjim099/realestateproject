import blogModel from "../models/blogModel.js";
import ApiError from "../utils/ApiError.js";
import slugify from "slugify";
import uploadCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createBlog = async (req, res, next) => {
    try {
        const { title, category, description, content } = req.body;
        if (!title || !category || !description || !content) {
            return next(ApiError(400, "All Fields are required"));
        }
        const blog = await blogModel.create({
            title,
            slug: slugify(title),
            category,
            description,
            content,
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