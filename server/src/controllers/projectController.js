import Project from "../models/projectModel.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import uploadCloudinary from "../utils/cloudinary.js";



const createProduct = asyncHandler(async (req, res, next) => {
    try {
        const { name, location, developer, description, specifications, startingFrom, currency, status, email, phone } = req.body;

        if (!name || !location || !developer || !description || !specifications || !startingFrom || !currency || !status || !email || !phone) {
            next(new ApiError(403, 'All Fields are required'));
        }

        const project = await Project.create({
            name,
            location,
            developer,
            description,
            specifications,
            pricing: {
                startingFrom,
                currency
            },
            status,
            contactInformation: {
                email,
                phone
            }
        });

        if (!project) {
            next(new ApiError(402, 'Product created failed'));
        }

        if (req.files) {
            try {

                const galleryImage = req.files.gallery;
                const floorPlanImage = req.files.floorPlan;
                const amenitiesImage = req.files.amenities;

                const galleyResult = await Promise.all(
                    galleryImage.map((file) => uploadCloudinary(file.path))
                );

                const floorPlanResult = await Promise.all(
                    floorPlanImage.map((file) => uploadCloudinary(file.path))
                );

                const amenitiesResult = await Promise.all(
                    amenitiesImage.map((file) => uploadCloudinary(file.path))
                );

                project.gallery = project.gallery.concat(galleyResult.map((result) => ({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                })));

                project.amenities = project.amenities.concat(amenitiesResult.map((result) => ({
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

                project.floorPlan = project.floorPlan.concat(floorPlanResult.map((result) => ({
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));
            } catch (Error) {
                next(new ApiError(500, Error.message));
            }
        }

        console.log(project);

        const saveProject = await project.save();

        return res.status(201).json(
            new ApiResponse(200, saveProject, "Create Project Successfully...")
        )

    } catch (Error) {
        next(new ApiError(500, Error.message));
    }
})


export {
    createProduct
}