import Content from "../models/contectModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createContact = asyncHandler(async (req, res, next) => {
    try {
        const { name, phone, email, interested, projectName } = req.body;
        console.log("req.body", req.body)
        console.log("projectName", projectName)

        if (!name || !phone || !email || !interested) {
            return next(new ApiError(403, 'All field are required...'));
        }

        const contact = await Content.create({
            name,
            phone,
            email,
            interested,
            projectName
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

const getAllContacts = asyncHandler(async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const contacts = await Content.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
        return res.status(201).json(
            new ApiResponse(200, contacts, 'Contacts fetched Successfully...')
        )
    } catch (error) {
        console.log(error.message);
        return next(new ApiError(500, error.message));
    }
})

export {
    createContact,
    getAllContacts
}