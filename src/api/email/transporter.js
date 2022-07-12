const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: process.env.MAIL_TRAP_SMTP_HOST,
    port: parseInt(process.env.MAIL_TRAP_SMTP_PORT),
    auth: {
        user: process.env.MAIL_TRAP_USER,
        pass: process.env.MAIL_TRAP_PASSWORD,
    }
});