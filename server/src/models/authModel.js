import {Schema ,model} from "mongoose";

const authSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'FirstName is Required'],
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'LastName is Required'],
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
        ]
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: [true, 'Password is Required'],
        select: false,
        minLength: [8, 'Password must be at least 8 charchter']
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER',
    },
    forgetPasswordToken: String,
    forgetPasswordExpiry: Date,
    token: {
        type: String
    }

}, {
    timestamps: true
});

const authModel = model("auth", authSchema);
export default authModel