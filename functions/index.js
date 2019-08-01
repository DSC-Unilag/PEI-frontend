import * as functions from 'firebase-functions';
import firebase from 'firebase';
import 'firebase/firestore';
import { config } from 'dotenv';

//POST /signup - Store user,
//POST /accounts - Create new account for the user,
//GET /accounts - Get all accounts for a user,
//POST /transfer - Iniialize Transfer,
//GET /transfer/:id - Validate if account being sent to exists

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

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});
