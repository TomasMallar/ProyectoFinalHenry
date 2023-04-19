const { transporter } = require('../../utils/mailer');
const jwt = require('jsonwebtoken');

const sendWelcomeEmail = async (mail, name) => {

    const secretKey = process.env.JWT_SECRET || 'your-secret-key';
    const token = jwt.sign({ mail }, secretKey, { expiresIn: '24h' });
  
    // const verificationLink = `https://yourwebsite.com/verify-email?token=${token}`;
    const verificationLink = `http://localhost:3001/email/verify-email?token=${token}`;

  const mailOptions = {
    from: 'the.chocolate.hub@outlook.com',
    to: mail,
    subject: 'Bienvenido a nuestra aplicación',
    text: `Hola ${name},\n\nGracias por registrarte en The Chocolate Hub. Estamos emocionados de tenerte a bordo.\n\nPor favor, verifica tu dirección de correo electrónico haciendo clic en el siguiente enlace:\n\n${verificationLink}\n\nSaludos,\nDon C. Hub`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendWelcomeEmail};
