const jwt = require('jsonwebtoken');
const { User } = require('../../db');

exports.verifyEmail = async (req, res) => {
  const token = req.query.token;
  const secretKey = 'ecommercechocolate';

  try {
    const decoded = jwt.verify(token, secretKey);
    const userEmail = decoded.email;

    // Actualiza el estado de verificación del usuario en la base de datos
    const user = await User.findOne({
      where: {
        mail: userEmail,
      },
    });
    
    if (user) {
      await user.update({ emailVerified: true });
      res.status(200).send('¡Correo electrónico verificado con éxito!');
    } else {
      res.status(404).send('Usuario no encontrado.');
    }
  } catch (error) {
    console.error(error);
    res.status(400).send('Enlace de verificación no válido o expirado.');
  }
};