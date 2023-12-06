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
    // city: {
    //     type: String,
    //     required: true
    // },
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
}, {
    timestamps: true,
});

const Project = model('Project', projectSchema);
export default Project;