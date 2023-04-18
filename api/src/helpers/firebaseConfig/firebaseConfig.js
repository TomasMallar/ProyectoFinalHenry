// Importar las funciones necesarias de los SDKs que se necesitan
const { initializeApp, GoogleAuthProvider } = require("firebase/app");
const provider = new GoogleAuthProvider();


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

// Tu configuración de Firebase
const firebaseConfig = {
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
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;