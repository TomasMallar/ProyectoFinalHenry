const { sendWelcomeEmail } = require('../../controllers/emailControllers/emailNewUserController');

const emailNewUserHandler = async (req, res) => {
  try {
    const { email, username } = req.body;
    await sendWelcomeEmail(email, username);
    res.status(200).json({ message: 'Correo electrónico enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el correo electrónico' });
  }
};

module.exports = {emailNewUserHandler};
