import mongoose, { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        }
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "auth",
        required: true
    }
},
    { timestamps: true });

const blogModel = model("blog", blogSchema);
export default blogModel