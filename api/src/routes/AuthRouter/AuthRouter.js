const { Router } = require("express");
// const authGoogleHandler = require("../../handlers/authHandler/authHandler")
// require("../../middlewares/authGoogle/authGoogle");
// const passport = require("passport");

const admin = require('../../helpers/firebase/firebaseConfig');

const routerAuth = Router(); 

routerAuth.get("/google", async (req, res) => {
    const idToken = req.body.idToken; // Obtén el ID del token enviado en la solicitud
  
    try {
      // Verifica el token con Firebase
      const decodedToken = await admin.auth().verifyIdToken(idToken);
  
      // Extrae la información del usuario del token
      const { uid, email, displayName } = decodedToken;
  
      // Busca si el usuario ya existe en la base de datos
      const user = await User.findOne({ where: { uid } });
  
      if (!user) {
        // Si el usuario no existe, crea un nuevo registro en la base de datos con la información del usuario de Firebase
        await User.create({
          uid,
          email,
          displayName,
        });
      }
  
      // Genera un token de acceso utilizando un paquete de autenticación, como jsonwebtoken
      const accessToken = jwt.sign(
        { uid, email, displayName },
        'secreto', // Reemplaza 'secreto' con tu propia clave secreta
        { expiresIn: '1d' } // Puedes ajustar la expiración del token como mejor se adapte a tu aplicación
      );
  
      // Devuelve el token de acceso al cliente
      res.json({ accessToken });
    } catch (error) {
      console.error('Error al verificar el token de Firebase:', error);
      res.status(401).json({ error: 'Token inválido' });
    }
  });
// routerAuth.use("/google", passport.authenticate("auth-google", {
//     scope: [
//         "https://www.googleapis.com/auth/userinfo.profile",
//         "https://www.googleapis.com/auth/userinfo.email",
//         "https://www.googleapis.com/auth/user.birthday.read",
//         "https://www.googleapis.com/auth/user.phonenumbers.read"
//     ],
//     session: false,
// }), authGoogleHandler)

module.exports = routerAuth;