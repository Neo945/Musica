const nodemailer = require('nodemailer');
const env = require('./config');

async function transport(to, subject, text) {
    const transporter = await nodemailer.createTransport({
        service: env.EMAIL_SERVICE,
        auth: {
            user: env.USER_EMAIL,
            pass: env.USER_PASSWORD,
        },
    });
    // eslint-disable-next-line no-return-await
    return await transporter.sendMail({
        from: env.USER_EMAIL,
        to: `${to}`,
        subject: `${subject}`,
        html: `${text}`,
    });
}
module.exports = transport;
