const { transporter } = require('../../utils/mailer');

const sendWelcomeEmail = async (email, username) => {
  const mailOptions = {
    from: 'the.chocolate.hub@outlook.com', // Reemplaza con tu dirección de correo electrónico
    to: email,
    subject: 'Bienvenido a nuestra aplicación',
    text: `Hola ${username},\n\nGracias por registrarte en The Chocolate Hub. Estamos emocionados de tenerte a bordo.\n\nSaludos,\nDon C. Hub`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {sendWelcomeEmail};
