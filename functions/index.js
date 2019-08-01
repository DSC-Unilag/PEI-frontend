import * as functions from 'firebase-functions';
import firebase from 'firebase';
import 'firebase/firestore';
import { config } from 'dotenv';

//POST /signup - Store user, - Done but not tested
//POST /accounts - Create new account for the user, - Done but not tested
//GET /accounts/:uid - Get all accounts for a user, - Done but not tested
//POST /transfer - Iniialize Transfer,
//GET /transfer/:aid - Validate if account being sent to exists

config();

const {
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_KEY,
  REACT_APP_FIREBASE_DOMAIN
} = process.env;

// Initialise Database
firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID
});

const db = firebase.firestore();

exports.saveUser = functions.https.onRequest(async (req, res) => {
  try {
    const { name, email } = req.body;
    const docRef = await db.collection('users').add({
      name,
      email
    });
    return res.status(201).json({
      status: 'success',
      message: 'User Saved',
      data: docRef
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An Error Occured',
      error: error.message
    });
  }
});

exports.getAllAccounts = functions.https.onRequest(async (req, res) => {
  try {
    const { uid } = req.params;
    const snapshot = db
      .collection('accounts')
      .where('userId', '==', uid)
      .get();
    return res.status(200).json({
      status: 'success',
      message: 'Accounts Retrieved',
      data: snapshot
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error.message
    });
  }
});

exports.createAccount = functions.https.onRequest(async (req, res) => {
  try {
    const { card_number, cvv, exp_date, uid } = req.body;
    const docRef = db.collection('accounts').add({
      card_number,
      exp_date,
      cvv,
      userId: uid
    });
    return res.status(201).json({
      status: 'success',
      message: 'Account Created',
      data: docRef
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
      error: error.message
    });
  }
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
