// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/compat';
import 'firebase/firestore';

import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLrqzQP38lW4oPf8qZo9yufJihv46LAgU",
  authDomain: "my-first-project-29287.firebaseapp.com",
  projectId: "my-first-project-29287",
  storageBucket: "my-first-project-29287.appspot.com",
  messagingSenderId: "506755038223",
  appId: "1:506755038223:web:0100a98851acc61b77777a",
  measurementId: "G-7E1G2XTMVL",
  databaseURL: "https://my-first-project-29287-default-rtdb.asia-southeast1.firebasedatabase.app",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth()

const db = getDatabase(app);

export { auth, db };
