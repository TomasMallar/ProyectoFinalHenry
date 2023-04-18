// firebaseConfig.js

const admin = require('firebase-admin');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY, // Reemplaza los caracteres de escape de nueva línea en la clave privada
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chocolate-henry.firebaseio.com', // Reemplaza <YOUR-FIREBASE-PROJECT-ID> con el ID de tu proyecto de Firebase
});

module.exports = admin;
