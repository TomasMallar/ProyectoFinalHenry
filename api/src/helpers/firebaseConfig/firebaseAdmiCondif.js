const admin = require('firebase-admin');
const serviceAccount = require('./firebaseConfig');
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

module.exports = admin;