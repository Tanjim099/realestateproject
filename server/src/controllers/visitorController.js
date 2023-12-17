import Visitor from "../models/visitorModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getVisitor = async (req, res, next) => {
    const { page, latitude, longitude } = req.body;
    // console.log(latitude);
    // console.log(longitude);
    try {
        const newVisitors = new Visitor({ 
            page, 
            location:{
                longitude,
                latitude,
            }
        });
        // console.log(newVisitors);
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