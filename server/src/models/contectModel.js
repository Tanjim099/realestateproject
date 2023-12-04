import { Schema, model } from 'mongoose';
import sendEmail from '../utils/sendEmail.js';

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

async function sendEmailContact(email) {
    try{
        const mailResponse = await sendEmail(email,'Contact Form Send');
        console.log(mailResponse);
    }catch(Error){
        console.log(Error);
        throw new Error;
    }
}

contectSchema.pre('save', async function (next) {
    if (this.isNew) {
        await sendEmailContact(this.email);
    }
    next();
})



const Content = model('Content', contectSchema);
export default Content;