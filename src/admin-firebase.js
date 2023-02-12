const admin = require('firebase-admin');
const serviceAccount = require('../telegram-trades-gamma-efa86-firebase-adminsdk-i2zk0-2583708646.json');

/*admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://telegram-trades-gamma.firebaseio.com"
});*/


const db = admin.firestore();

const collectionRef = db.collection('trades');

collectionRef.get()
  .then((snapshot) => {
    console.log('Number of documents in collection:', snapshot.size);
  })
  .catch((error) => {
    console.log('Error getting collection:', error);
  });