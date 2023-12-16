import Visitor from "../models/VisitorModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getVisitor = async (req, res, next) => {
    const { page, location } = req.body;
    try {
        const newVisitors = new Visitor({ page, location })
        await newVisitors.save();
        res.status(201).json(
            new ApiResponse(200, newVisitors, "Fetched Successfully")
        )
    } catch (error) {
        console.error(`Error in searchProject: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}