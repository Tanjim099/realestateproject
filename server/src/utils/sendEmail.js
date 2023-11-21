import nodemailer from 'nodemailer';


const sendEmail = async function (email, subject, message) {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.HOST,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            }
        });

        const info = transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL,
            to: `${email}`,
            subject: `${subject}`,
            message: `${message}`
        });

        console.log('EMAIL SEND SUCCESSFULLY -> ',info);

    } catch (Error) {
        console.log('EMAIL SEND FAILED -> ', Error);
    }
}

export default sendEmail;