import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import ratingandreview from "../models/ratingandreview.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";


const createRating = asyncHandler(async (req, res, next) => {
    try {
        console.log('Starting...');
        const { rating, review, id } = req.body;
        const {projectId} = req.params;
        
        // const id = req.user._id;

        if (!rating || !review || !projectId) {
            return next(new ApiError(403, 'Field are mandatory'));
        }

        // const alredyReview = await ratingandreview.findOne(
        //     {
        //         project: projectId,
        //         user: id
        //     }
        // );

        // if (alredyReview) {
        //     return next(new ApiError(403, 'Project is already reviewed by the user'))
        // }

        const createRating = await ratingandreview.create({
            project: projectId,
            rating, review,
            user: id,
        });

        const updateProjectDetail = await Project.findByIdAndUpdate(
            { _id: projectId },
            {
                $push: {
                    ratingandreview: createRating._id,
                }
            },
            { new: true }
        )

        console.log(updateProjectDetail);

        return res.status(201).json(
            new ApiResponse(200, createRating, 'Rating and Review created Successfully')
        )

    } catch (Error) {
        console.log(Error.message);
        return next(new ApiError(500, Error.message));
    }
})

const getAverageRating = asyncHandler(async (req, res, next) => {
    try {
        const { projectId } = req.params;

        if (!projectId) {
            return next(new ApiError(402, 'Project id is required...'));
        }

        const result = await ratingandreview.aggregate([
            {
                $match: {
                    project: new mongoose.Types.ObjectId(projectId),
                },
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    }
                },
            },

        ]);

        console.log(result);

        if (result.length > 0) {
            return res.status(201).json(
                new ApiResponse(200, { averageRating: result[0].averageRating, }, 'Successfully...')
            )
        }

        return res.status(201).json(
            new ApiResponse(200, { averageRating: 0, }, 'Average Rating is 0, no ratings given till now')
        )

    } catch (Error) {
        console.log(Error.message);
        return next(new ApiError(500, Error.message));
    }
})


const getAllRating = asyncHandler(async (req, res, next) => {
    try {
        const allReview = await ratingandreview.find({})
            .populate({
                path: 'user',
                select: "firstName lastName email avatar",
            })
            .populate({
                path: 'project',
                select: "name",
            })
            .exec();

        return res.status(201).json(
            new ApiResponse(200, { data: allReview }, 'All reviews fetched successfully')
        );

    } catch (error) {
        console.log(error.message);
        return next(new ApiError(500, error.message));
    }
});


export {
    createRating,
    getAverageRating,
    getAllRating
}
