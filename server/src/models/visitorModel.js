import { Schema, model } from "mongoose";

const visitorSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    page: {
        type: String
    },
    location: {
        latitude: {
            type: String
        },
        longitude: {
            type: String
        }
    }
});

const Visitor = model("visitor", visitorSchema);
export default Visitor;