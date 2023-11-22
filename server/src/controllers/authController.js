import authModel from "../models/authModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/cloudinary.js";
import otpGenerator from 'otp-generator';
import OTP from "../models/otpModel.js";
import JWT from 'jsonwebtoken';
import { camparePassword, hashPassword } from "../helpers/authHelper.js";


export const sendOTP = asyncHandler(async (req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) {
            next(new ApiError(403, 'Email is required'));
        }

        const existUser = await authModel.findOne({ email });

        if (existUser) {
            next(new ApiError(403, 'User is already exist,Please try to login'));
        }

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        const result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
            });
        }

        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);

        // console.log(otpBody);

        return res.status(201).json(
            new ApiResponse(200, otpBody, 'OTP send successfully...')
        )

    } catch (Error) {
        console.log(Error.message);
        next(new ApiError(500, Error.message));
    }
});

export const register = asyncHandler(async (req, res, next) => {
    try {
        console.log("Starting...");

        const { firstName, lastName, email, phone, password, otp } = req.body;
        console.log(typeof otp);

        if (!firstName || !lastName || !email || phone || password, !otp) {
            return next(new ApiError(400, "All Fields are required"));
        }
        const userExists = await authModel.findOne({ email });
        if (userExists) {
            return next(new ApiError(400, "Email Already Exists"));
        }

        const response = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.otp.length === 0) {
            return next(new ApiError(400, 'The OTP is not valid'));
        } else if (otp !== response.otp) {
            return next(new ApiError(400, 'The OTP is not valid'));
        }

        const hashedPassword = await hashPassword(password);
        const user = await authModel.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            avatar: {
                public_id: "DUMMY",
                secure_url: "https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg"
            }
        })

        // if (req.file) {
        //     const result = await cloudinary.v2.uploader.upload(req.file.path, {
        //         folder: "realestate"
        //     });

        //     if (result) {
        //         user.avatar.public_id = result.public_id;
        //         user.avatar.secure_url = result.secure_url;
        //     }
        //     fs.rm(`uploads/${req.file.filename}`)
        // };

        const avatarLocalPath = req.file.path;
        // console.log(avatarLocalPath);

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required");
        }

        const avatar = await uploadCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
        }

        user.avatar.public_id = avatar.public_id;
        user.avatar.secure_url = avatar.secure_url;



        await user.save();

        return res.status(201).json(
            new ApiResponse(200, user, "User registered Successfully")
        )

    } catch (error) {
        next(new ApiError(500, error.message));
    }
})

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(password);
        if (!email, !password) {
            return next(new ApiError(400, "All Fields are required"));
        }

        const user = await authModel.findOne({ email });

        console.log(user.password);

        if (!user) {
            return next(new ApiError(404, "Email is not registered"));
        }

        const match = await camparePassword(password, user.password);
        console.log(match);

        if (!match) {
            return next(new ApiError(404, "Invalid Password"));
        }

        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: 7 * 24 * 60 * 60 * 1000,
        });
        console.log("token->", token)
        res.cookie("token", token,{
            secure: true,
            httpOnly:true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        user.token = token;
        await user.save();

        res.status(201).json(
            new ApiResponse(200, user, "User login Successfully")
        )
    } catch (error) {
        next(new ApiError(500, error.message));
    }
}

export const logout = async (req, res, next) => {
    try {
        res.cookie("token", null, {
            secure: true,
            maxAge: 0,
            httpOnly: true
        })

        res.status(201).json({
            success: true,
            message: "User Logout Successfully"
        })
    } catch (error) {
        nexy(new ApiError(500, error.message));
    }
}


export const updateUser = async (req, res, next) => {
    try {

        const { firstName, lastName, phone } = req.body;
        const { id } = req.params;
        const user = await authModel.findById(id);

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.phone = phone || user.phone;

        const avatarLocalPath = req.file.path;
        // console.log(avatarLocalPath);

        if (!avatarLocalPath) {
             next(new ApiError(400, "Avatar file is required"));
        }

        const avatar = await uploadCloudinary(avatarLocalPath);

        if (!avatar) {
            next(new ApiError(400, "Avatar file is required"));
        }

        user.avatar.public_id = avatar.public_id;
        user.avatar.secure_url = avatar.secure_url;

        await user.save();

        return res.status(201).json(
            new ApiResponse(200, user, "User updated Successfully")
        )

    } catch (error) {
        throw new ApiError(500, error.message);
    }
}