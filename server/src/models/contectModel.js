import { Schema, model } from 'mongoose';

const contectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    interested: {
        type: String,
        required: true,
    }
}, { timestamps: true });


const Content = model('Content', contectSchema);
export default Content;