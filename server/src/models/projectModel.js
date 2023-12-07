import { Schema, model } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        require: true
    },
    city: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    developer: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    floorPlan: [
        {
            types: {
                type: String,
                required: true,
            },
            image: {
                public_id: String,
                secure_url: String,
            },
            dimensions: {
                type: String,
                required: true,
            },
            price: {
                type: String,
                required: true,
            }
        },
    ],
    amenities: [
        {
            name: {
                type: String,
                required: true,
            },
            image: {
                public_id: String,
                secure_url: String,
            }
        },
    ],
    gallery: [
        {
            public_id: String,
            secure_url: String
        },
    ],
    specifications: {
        type: String,
        required: true,
    },
    pricing: {
        startingFrom: {
            type: String,
            required: true,
        },
        currency: {
            type: String,
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['pre-launch', 'ongoing', 'completed'],
        default: 'pre-launch',
    },
    contactInformation: {
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
    },
    map: {
        type: String,
        required: true
    },
    projectArea: {
        type: String,
        required: true
    },
    possessionOn: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        required: true
    },
    reraNo: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Project = model('Project', projectSchema);
export default Project;