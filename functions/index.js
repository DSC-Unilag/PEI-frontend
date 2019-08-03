const functions = require('firebase-functions');
const firebase = require('firebase');
const cors = require('cors')({ origin: true });
require('firebase/firestore');
const { config } = require('dotenv');

//POST /signup - Store user, - Done
//POST /accounts - Create new account for the user, - Done
//GET /accounts/:uid - Get all accounts for a user, - Done
//POST /transfer - Iniialize Transfer,
//GET /transfer/:aid - Validate if account being sent to exists

config();

const { FIREBASE_PROJECT_ID, FIREBASE_KEY, FIREBASE_DOMAIN } = process.env;

// Initialise Database
firebase.initializeApp({
  apiKey: FIREBASE_KEY,
  authDomain: FIREBASE_DOMAIN,
  projectId: FIREBASE_PROJECT_ID
});

const db = firebase.firestore();

module.exports.saveUser = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { username, email, uid } = req.body;
    db.collection('users')
      .add({
        username,
        email,
        uid
      })
      .then(docRef => {
        return res.status(201).json({
          status: 'success',
          message: 'User Saved',
          data: docRef.id
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 'error',
          message: 'An Error Occured',
          error: error.message,
          stack: error.stack
        });
      });
  });
});

module.exports.getAllAccounts = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { user_id } = req.body;
    db.collection('accounts')
      .where('userId', '==', user_id)
      .get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => doc.data());
        return res.status(200).json({
          status: 'success',
          message: 'Accounts Retrieved',
          data
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong',
          error: error.message
        });
      });
  });
});

module.exports.createAccount = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { name, card_number, cvv, exp_date, uid, acc_type } = req.body;
    db.collection('accounts')
      .add({
        name,
        card_number,
        acc_type,
        exp_date,
        cvv,
        userId: uid
      })
      .then(docRef => {
        return res.status(201).json({
          status: 'success',
          message: 'Account Created',
          data: docRef.id
        });
      })
      .catch(error => {
        return res.status(500).json({
          status: 'error',
          message: 'Something went wrong',
          error: error.message
        });
      });
  });
});
