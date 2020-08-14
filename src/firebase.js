import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBMupir5JK0_JZBO0T0wIHGXCviy0HIlCY",
  authDomain: "facebook-messenger-clone-b308e.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-b308e.firebaseio.com",
  projectId: "facebook-messenger-clone-b308e",
  storageBucket: "facebook-messenger-clone-b308e.appspot.com",
  messagingSenderId: "391739193101",
  appId: "1:391739193101:web:239664ee945ecb758f2244",
  measurementId: "G-V1TK7W1K9Y",
});

const db = firebaseApp.firestore();

export default db;
