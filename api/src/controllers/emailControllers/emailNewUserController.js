const { transporter } = require('../../utils/mailer');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const handlerbars = require("handlebars");

const sendWelcomeEmail = async (mail, name) => {

  const secretKey = process.env.JWT_SECRET || 'your-secret-key';
  const token = jwt.sign({ mail }, secretKey, { expiresIn: '24h' });
  
  // const verificationLink = `https://yourwebsite.com/verify-email?token=${token}`;
  const verificationLink = `http://localhost:3001/email/verify-email?token=${token}`;

  const templateFile = fs.readFileSync(__dirname + "/../../views/emailWelcome.handlebars").toString();
  const template = handlerbars.compile(templateFile);
  const html = template({ name , verificationLink })

  const mailOptions = {
    from: 'thechocolatehub@outlook.com.ar',
    to: mail,
    subject: 'Bienvenido a nuestra aplicación',
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendWelcomeEmail};