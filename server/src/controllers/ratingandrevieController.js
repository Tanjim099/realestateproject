import Project from "../models/projectModel";
import ratingandreview from "../models/ratingandreview";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asyncHandler";


const createRating = asyncHandler(async (req, res, next) => {
    try {
        const { rating, review, projectId } = req.body;
        const id = req.user._id;
        if (!rating || !review || !projectId) {
            return next(new ApiError(403, 'Field are mandatory'));
        }

        const alredyReview = await ratingandreview.findOne(
            {
                project: projectId,
                user: id
            }
        );

        if (alredyReview) {
            return next(new ApiError(403, 'Project is already reviewed by the user'))
        }

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
                    project: projectId
                },
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    }
                }
            }

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

export {
    createRating,
    getAverageRating
}
