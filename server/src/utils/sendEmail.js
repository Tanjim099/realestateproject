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

        const info = await transporter.sendMail({
            from: email,
            to: "samrush0099@gmail.com",
            subject: subject,
            html: `${message}`,
        });
        console.log("User", email)
        console.log('EMAIL SENT SUCCESSFULLY -> ', info);
        return info;

    } catch (error) {
        console.error('EMAIL SEND FAILED -> ', error);
        throw error;
    }
}

export default sendEmail;
