import slugify from "slugify";
import Project from "../models/projectModel.js";
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js"
import uploadCloudinary from "../utils/cloudinary.js";



const createProject = asyncHandler(async (req, res, next) => {
    try {
        // console.log('Starting...');
        const { name, location, city, content, developer, description, specifications, startingFrom, currency, email, phone, map, projectArea, possessionOn, projectType, reraNo } = req.body;
        let { floorName, amenitiesName, dimensions, floorPrice } = req.body;

        if (!name || !location || !city || !developer || !description || !specifications || !startingFrom || !currency || !email || !phone || !floorName || !amenitiesName || !map || !projectArea || !possessionOn || !projectType || !reraNo || !dimensions || !floorPrice) {
            return next(new ApiError(403, 'All Fields are required'));
        }

        floorName = JSON.parse(floorName);
        amenitiesName = JSON.parse(amenitiesName);
        dimensions = JSON.parse(dimensions);
        floorPrice = JSON.parse(floorPrice);

        // console.log(floorName[0]);

        const project = await Project.create({
            name,
            slug: slugify(name),
            location,
            developer,
            description,
            specifications,
            content,
            city,
            map,
            projectArea,
            possessionOn,
            projectType,
            reraNo,
            pricing: {
                startingFrom,
                currency
            },
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
                // console.log(req.files.gallery);
                // console.log(req.files.floorPlan);
                // console.log(req.files.amenities);
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

                project.amenities = project.amenities.concat(amenitiesResult.map((result, idx) => ({
                    name: amenitiesName[idx],
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

                project.floorPlan = project.floorPlan.concat(floorPlanResult.map((result, idx) => ({
                    types: floorName[idx],
                    dimensions: dimensions[idx],
                    floorPrice: floorPrice[idx],
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
        console.log(Error.message);
        next(new ApiError(500, Error.message));
    }
})

const updateProject = asyncHandler(async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, location, city, developer, description, specifications, startingFrom, currency, email, phone, map, projectArea, possessionOn, projectType, reraNo, content } = req.body;
        let { floorName, amenitiesName, dimensions, floorPrice } = req.body;
        floorName = JSON.parse(floorName);
        amenitiesName = JSON.parse(amenitiesName);
        dimensions = JSON.parse(dimensions);
        floorPrice = JSON.parse(floorPrice);
        if (!id) {
            return next(new ApiError(403, 'Project id not found,Please try again later'));
        }

        const project = await Project.findById({ _id: id });

        if (!project) {
            return next(new ApiError(402, 'Project is not found...'));
        }

        const updatedProject = await Project.findByIdAndUpdate(id, {
            name: name || project.name,
            slug: slugify(name),
            location: location || project.location,
            developer: developer || project.developer,
            description: description || project.description,
            city: city || project.city,
            specifications: specifications || project.specifications,
            pricing: {
                startingFrom: startingFrom || project.pricing.startingFrom,
                currency: currency || project.pricing.currency
            },
            contactInformation: {
                email: email || project.contactInformation.email,
                phone: phone || project.contactInformation.phone
            },
            content: content || project.content,
            map: map || project.map,
            projectArea: projectArea || project.projectArea,
            possessionOn: possessionOn || project.possessionOn,
            projectType: projectType || project.projectType,
            reraNo: reraNo || project.reraNo,
        }, { new: true });

        if (!updatedProject) {
            return next(new ApiError(403, 'Failed to update project...'));

        }


        if (req.files && req.files.floorPlan && req.files.gallery && req.files.amenities) {
            try {
                const galleryImage = req.files.gallery;
                const floorPlanImage = req.files.floorPlan;
                const amenitiesImage = req.files.amenities;

                // Upload images to Cloudinary
                const galleryResult = await Promise.all(
                    galleryImage.map((file) => uploadCloudinary(file.path))
                );

                const floorPlanResult = await Promise.all(
                    floorPlanImage.map((file) => uploadCloudinary(file.path))
                );

                const amenitiesResult = await Promise.all(
                    amenitiesImage.map((file) => uploadCloudinary(file.path))
                );

                // Update the project with the new images
                updatedProject.gallery = updatedProject.gallery.concat(galleryResult.map((result) => ({
                    public_id: result.public_id,
                    secure_url: result.secure_url,
                })));

                updatedProject.amenities = updatedProject.amenities.concat(amenitiesResult.map((result, idx) => ({
                    name: amenitiesName[idx],
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

                updatedProject.floorPlan = updatedProject.floorPlan.concat(floorPlanResult.map((result, idx) => ({
                    types: floorName[idx],
                    dimensions: dimensions[idx],
                    floorPrice: floorPrice[idx],
                    image: {
                        public_id: result.public_id,
                        secure_url: result.secure_url,
                    },
                })));

                // Save the updated project to the database
                await updatedProject.save();

            } catch (error) {
                return next(new ApiError(500, error.message));
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
        const project = await Project.findOne({ slug: id });
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

        const allProjects = await Project.find().limit(limit * 1).skip((page - 1) * limit).sort({ createdAt: -1 }).exec();

        const count = await Project.countDocuments();
        // console.log(allProjects);
        res.status(201).json(
            new ApiResponse(200, allProjects, "All Projects feched Successfully...")
        )
    } catch (error) {
        return next(new ApiError(500, error.message));
    }
}

export const getAllProjectsByPage = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const projects = await Project.find().skip((page - 1) * limit).limit(limit).sort({ createdAt: -1 });
        res.status(201).json(
            new ApiResponse(200, projects, "Project Fetched Successfully")
        );
    } catch (error) {
        console.log(error);
        next(new ApiError(500, error.message));
    }
}


//delete project
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        // console.log(id)
        const project = await Project.findByIdAndDelete(id);
        res.status(201).json(
            new ApiResponse(200, project, "Project deleted Successfully...")
        )
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, Error.message));
    }
}

//search Project
const searchProject = async (req, res, next) => {
    try {
        const { query } = req.query;
        const projects = await Project.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { developer: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
            ],
        });

        res.json(projects);
    } catch (error) {
        console.error(`Error in searchProject: ${error.message}`);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
}

const projectSuggestions = async (req, res, next) => {
    try {
        const { query } = req.query;
        const suggestions = await Project.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { developer: { $regex: query, $options: 'i' } },
                { location: { $regex: query, $options: 'i' } },
            ],
        })
            .select('name')
            .limit(5); // Adjust the limit as needed

        const suggestionList = suggestions.map((project) => project.name);
        res.json(suggestionList);
    } catch (error) {

    }
}

//similar project
const similarProject = async (req, res, next) => {
    const { developer, city } = req.params;
    try {
        const similarProjects = await Project.find({ developer, city }).limit(5);
        res.status(201).json(
            new ApiResponse(200, similarProjects, "Fetched Similar Project Successfully")
        )
    } catch (error) {
        console.log(error)
        return next(new ApiError(500, Error.message));
    }
}
export {
    createProject,
    updateProject,
    getProject,
    getAllProject,
    deleteProject,
    searchProject,
    projectSuggestions,
    similarProject
}