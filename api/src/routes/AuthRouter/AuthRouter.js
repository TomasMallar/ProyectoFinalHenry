const { Router } = require("express");
// const authGoogleHandler = require("../../handlers/authHandler/authHandler")
// require("../../middlewares/authGoogle/authGoogle");
// const passport = require("passport");
const admin = require('firebase-admin');
const { initializeApp, GoogleAuthProvider } = require("firebase/app");


require("dotenv").config();
const { 
    FIREBASE_TYPE, 
    FIREBASE_PRIVATE_KEY, 
    FIREBASE_PRIVATE_KEY_ID, 
    FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    FIREBASE_AUTH_URI,
    FIREBASE_CLIENT_EMAIL, 
    FIREBASE_CLIENT_ID,
    FIREBASE_CLIENT_X509_CERT_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_TOKEN_URI
} = process.env;

const routerAuth = Router(); 

admin.initializeApp({
    credential: admin.credential.cert({
        type: FIREBASE_TYPE,
        project_id: FIREBASE_PROJECT_ID,
        private_key_id: FIREBASE_PRIVATE_KEY_ID,
        private_key: FIREBASE_PRIVATE_KEY,
        client_email: FIREBASE_CLIENT_EMAIL,
        client_id: FIREBASE_CLIENT_ID,
        auth_uri: FIREBASE_AUTH_URI,
        token_uri: FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: FIREBASE_CLIENT_X509_CERT_URL
    })
});

routerAuth.get("/google", (req, res) => {
    const provider = admin.auth.GoogleAuthProvider;
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly'); // Puedes agregar más permisos OAuth si es necesario

    // Redirige al usuario al flujo de autenticación de Google
    const redirectUrl = `https://${req.headers.host}/bienvenida`; // URL a la que se redirigirá al usuario después de la autenticación
    admin.auth().signInWithRedirect(provider)
        .then(() => {
            // La redirección se completa en la página de Google y luego redirige de nuevo a tu aplicación
            return res.redirect(redirectUrl);
        })
        .catch((error) => {
            console.error('Error en la autenticación con Google:', error);
            return res.status(500).send('Error en la autenticación con Google');
        });
});

routerAuth.get("/bienvenida", (req, res) => {
    admin.auth().getRedirectResult(req)
        .then((result) => {
            // El usuario ha sido autenticado exitosamente
            const token = result.credential.accessToken; // Token de acceso de Google
            const user = result.user; // Información del usuario autenticado

            // Haz algo con el token de acceso y la información del usuario, por ejemplo, guarda el usuario en la base de datos o genera un token de sesión en tu aplicación

            // Redirige al usuario a la página de inicio o a la URL que desees
            return res.redirect('/');
        })
        .catch((error) => {
            console.error('Error en la autenticación con Google:', error);
            return res.status(500).send('Error en la autenticación con Google');
        });
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