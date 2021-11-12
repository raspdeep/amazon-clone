// Import the functions you need from the SDKs you need
//import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnGo_lXEuhsPwu543-NljrOZTFBnYg7BI",
  authDomain: "clone-38c90.firebaseapp.com",
  projectId: "clone-38c90",
  storageBucket: "clone-38c90.appspot.com",
  messagingSenderId: "1068902349930",
  appId: "1:1068902349930:web:e3bdfea42cf4fb2b1a9e13",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();

export { db, auth };
