import { Schema, model } from 'mongoose';
import sendEmail from '../utils/sendEmail.js';
import { contactTemplate } from '../mail/template/contactTemplate.js';

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

async function sendEmailContact(email, name, phone, interested) {
    try {
        const mailResponse = await sendEmail(email, 'Contact Form Send', contactTemplate(name, phone, email, interested));
        console.log(mailResponse);
    } catch (Error) {
        console.log(Error);
        throw new Error;
    }
}

contectSchema.pre('save', async function (next) {
    if (this.isNew) {
        await sendEmailContact(this.email, this.name, this.phone, this.interested);
    }
    next();
})



const Content = model('Content', contectSchema);
export default Content;