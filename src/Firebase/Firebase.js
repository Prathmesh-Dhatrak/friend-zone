import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const provider = new firebase.auth.GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBMupir5JK0_JZBO0T0wIHGXCviy0HIlCY",
  authDomain: "facebook-messenger-clone-b308e.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-b308e.firebaseio.com",
  projectId: "facebook-messenger-clone-b308e",
  storageBucket: "facebook-messenger-clone-b308e.appspot.com",
  messagingSenderId: "391739193101",
  appId: "1:391739193101:web:239664ee945ecb758f2244",
  measurementId: "G-V1TK7W1K9Y",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, provider, storage };

