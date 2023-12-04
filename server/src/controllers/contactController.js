import Content from "../models/contectModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createContact = asyncHandler(async (req, res, next) => {
    try {
        const { name, phone, email, interested } = req.body;

        if (!name || !phone || !email || !interested) {
            return next(new ApiError(403, 'All field are required...'));
        }

        const contact = await Content.create({
            name,
            phone,
            email,
            interested
        });

        if (!contact) {
            return next(new ApiError(403, 'Contact not created...'));
        }

        return res.status(201).json(
            new ApiResponse(200, contact, 'Contact is created...')
        )

    } catch (Error) {
        console.log(Error.message);
        return next(new ApiError(500, Error.message));
    }
})

export {
    createContact
}