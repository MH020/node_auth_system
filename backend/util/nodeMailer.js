import 'dotenv/config'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
  },
});

async function sendMail(email) {
    const info = {
        from: {
            name: "Wall of Guns",
            address: process.env.GMAIL_USER
        },
        to: email,
        subject: 'wow',
        text: 'Hello world?',
        html: '<b>Hello world?</b>',
    };
    try {
        transporter.sendMail(info);
        console.log("Mail sent!");
    } catch (error) {
        console.log("Error sending mail:", error);
    }
}

