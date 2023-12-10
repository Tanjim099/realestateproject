import { Schema, model } from 'mongoose';


const ratingandreviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'auth'
    },
    rating: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        index: true,
    }
}, { timestamps: true });


const ratingandreview = model('ratingandreview', ratingandreviewSchema);
export default ratingandreview;