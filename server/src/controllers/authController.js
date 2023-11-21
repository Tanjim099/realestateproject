import authModel from "../models/authModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadCloudinary from "../utils/cloudinary.js";
import otpGenerator from 'otp-generator';
import OTP from "../models/otpModel.js";
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

export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, phone, password, otp } = req.body;
        if (!firstName || !lastName || !email || phone || password, !otp) {
            return next(new asyncHandler("All Fields are required", 400));
        }
        const userExists = await authModel.findOne({ email });
        if (userExists) {
            return next(new asyncHandler("Email Already Exists", 400));
        }

        const response = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(response);

        if (response.length === 0) {
            return next(new ApiError(400, 'The OTP is not valid'));
        } else if (otp !== response[0].otp) {
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

        const avatarLocalPath = req.files?.avatar[0]?.path;

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required");
        }

        const avatar = await uploadCloudinary(avatarLocalPath);

        if (!avatar) {
            throw new ApiError(400, "Avatar file is required");
        }

        console.log(avatar);

        await user.save();

        return res.status(201).json(
            new ApiResponse(200, user, "User registered Successfully")
        )

    } catch (error) {
        throw new ApiError(500, error.message);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email, password) {
            return next(new asyncHandler("All Fields are required", 400));
        }

        const user = await authModel.findOne({ email });
        if (!user) {
            return next(new asyncHandler("Email is not registered", 404));
        }
        const match = await camparePassword(password, user.password);
        if (!match) {
            return next(new asyncHandler("Invalid Password", 404));
        }
        res.status(201).json(
            new ApiResponse(200, user, "User login Successfully")
        )
    } catch (error) {
        throw new ApiError(500, error.message);
    }
}
