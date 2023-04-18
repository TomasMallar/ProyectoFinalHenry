// firebaseConfig.js

const admin = require('firebase-admin');

const serviceAccount = require('./credencialesChocolate.json'); // Ruta al archivo de credenciales de Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://chocolate-henry.firebaseio.com', // Reemplaza <YOUR-FIREBASE-PROJECT-ID> con el ID de tu proyecto de Firebase
});

module.exports = admin;
