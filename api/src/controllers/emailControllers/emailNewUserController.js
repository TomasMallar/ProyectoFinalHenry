const { transporter } = require('../../utils/mailer');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const path = require('path');
const util = require('util');
const handlerbars = require("handlebars");

const sendWelcomeEmail = async (mail, name) => {

  const secretKey = process.env.JWT_SECRET || 'your-secret-key';
  const token = jwt.sign({ mail }, secretKey, { expiresIn: '24h' });
  
  // const verificationLink = `https://yourwebsite.com/verify-email?token=${token}`;
  const verificationLink = `http://${PORT}/email/verify-email?token=${token}`;

  const readFile = util.promisify(fs.readFile);
  const templateFile = await readFile(path.resolve(__dirname, '../../views/emailWelcome.handlebars'), 'utf8');
  const template = handlerbars.compile(templateFile);
  const html = template({ name , verificationLink })

  const mailOptions = {
    from: 'the.chocolate.hub@outlook.com',
    to: mail,
    subject: 'Bienvenido a nuestra aplicación',
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendWelcomeEmail};