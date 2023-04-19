const nodemailer = require('nodemailer');
const { EMAIL_FROM, EMAIL_FROM_PASS, EMAIL_SERVICE} = process.env;

const transporter = nodemailer.createTransport({
  service: EMAIL_SERVICE,
  auth: {
    user: EMAIL_FROM ,
    pass: EMAIL_FROM_PASS,
  },
});

module.exports = { transporter };
