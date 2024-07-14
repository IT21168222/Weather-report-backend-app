import nodemailer from 'nodemailer';
import { config } from 'dotenv'
config();


//The credentials of gmail account is inside the .env file
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: `${process.env.MAIL_ADDRESS}`,
        pass: `${process.env.MAIL_PASSWORD}`
    }
});


//This is using for send mail to relavant users
export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: `${process.env.MAIL_ADDRESS}`,
        to: to,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};