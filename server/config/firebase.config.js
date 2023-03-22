
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://projectmusicapp-39cb9-default-rtdb.firebaseio.com"
});

module.exports=admin;
