const admin = require('firebase-admin');
const serviceAccount = require('../epsacoaprender-firebase-adminsdk-yybzp-c84494e7da.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://epsacoaprender.firebaseio.com"
  });
}

module.exports = admin;