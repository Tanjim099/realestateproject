import authModel from "../models/authModel.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, password } = req.body;
        if (!firstName || !lastName || !email || phone || password) {
            return next(new asyncHandler("All Fields are required", 400));
        }
        const userExists = await authModel.findOne({ email });
        if (userExists) {
            return next(new asyncHandler("Email Already Exists", 400));
        }

        const user = await authModel.create({
            firstName,
            lastName,
            email,
            phone,
            password,
            avatar: {
                public_id: "DUMMY",
                secure_url: "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
            }
        })

        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path, {
                folder: "realestate"
            });

            if (result) {
                user.avatar.public_id = result.public_id;
                user.avatar.secure_url = result.secure_url;
            }
            fs.rm(`uploads/${req.file.filename}`)
        };

        await user.save();
        res.status(200).json({
            success: true,
            message: "User Register Successfully",
            user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Error while creating account",
            error
        })
    }
}