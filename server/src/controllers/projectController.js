import Project from "../models/projectModel.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import uploadCloudinary from "../utils/cloudinary.js";



const createProject = asyncHandler(async (req, res, next) => {
    try {
        const { name, location, developer, description, specifications, startingFrom, currency, status, email, phone } = req.body;

        if (!name || !location || !developer || !description || !specifications || !startingFrom || !currency || !status || !email || !phone) {
            return next(new ApiError(403, 'All Fields are required'));
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
            return next(new ApiError(402, 'Product created failed'));
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
                return next(new ApiError(500, Error.message));
            }
        }

        const saveProject = await project.save();

        return res.status(201).json(
            new ApiResponse(200, saveProject, "Create Project Successfully...")
        )

    } catch (Error) {
        next(new ApiError(500, Error.message));
    }
})

const updateProject = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!id) {
            return next(new ApiError(403, 'Project id not found,Please try again later'));
        }

        const project = await Project.findById({ _id: id });

        if (!project) {
            return next(new ApiError(402, 'Project is not found...'));
        }

        const updatedProject = await Project.findByIdAndUpdate(id, {
            $set: req.body
        }, { new: true });

        if (!updatedProject) {
            return next(new ApiError(403, 'Failed to update project...'));

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

                updatedProject.gallery = updatedProject.gallery.concat(galleyResult.map((result) => ({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                })));

                updatedProject.amenities = updatedProject.amenities.concat(amenitiesResult.map((result) => ({
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

                updatedProject.floorPlan = updatedProject.floorPlan.concat(floorPlanResult.map((result) => ({
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

            } catch (Error) {
                return next(new ApiError(500, Error.message));
            }
        }

        const saveProject = await updatedProject.save();

        return res.status(201).json(
            new ApiResponse(200, saveProject, "Create Project Successfully...")
        )

    } catch (Error) {
        return next(new ApiError(500, Error.message));
    }
})

//get single project
const getProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findById(id);
        if (!project) {
            return next(new ApiError(403, 'Invalid Project id'));
        }
        res.status(201).json(
            new ApiResponse(200, project, "Project feched Successfully...")
        )
    } catch (error) {
        return next(new ApiError(500, Error.message));
    }
}

//get all project
const getAllProject = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const allProjects = await Project.find().limit(limit * 1).skip((page - 1) * limit).exec().sort({ createdAt: -1 });
        const count = await Project.countDocuments();

        res.status(201).json(
            new ApiResponse(200, allProjects, "All Projects feched Successfully...")
        )
    } catch (error) {
        return next(new ApiError(500, Error.message));
    }
}


//delete project
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        res.status(201).json(
            new ApiResponse(200, project, "Project deleted Successfully...")
        )
    } catch (error) {
        return next(new ApiError(500, Error.message));
    }
}

//search Project
const searchProject = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, name, location, developer, floorPlan, } = req.query;

        const query = {};
        if (name) {
            query.name = { $regex: new RegExp(name, "i") };
        }
        if (location) {
            query.location = { $regex: new RegExp(location, "i") };
        }
        if (developer) {
            query.developer = { $regex: new RegExp(developer, "i") };
        }
        if (floorPlan) {
            query.floorPlan = { $regex: new RegExp(floorPlan, "i") };
        }

        const projects = await Project.find(query).limit(limit * 1).skip((page - 1) * limit).exec();

        const count = await Project.countDocuments(query);
        res.status(200).json({
            projects,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    } catch (error) {
        return next(new ApiError(500, Error.message));
    }
}
export {
    createProject,
    updateProject,
    getProject,
    getAllProject,
    deleteProject,
    searchProject
}