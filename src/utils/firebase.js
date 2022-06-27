// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBSAijyWJU-gVwoEKZRLX2arLVZDmxrkgQ",
  authDomain: "chat-5d4db.firebaseapp.com",
  projectId: "chat-5d4db",
  storageBucket: "chat-5d4db.appspot.com",
  messagingSenderId: "211765026236",
  appId: "1:211765026236:web:337a630002092482af5fb9",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
auth.languageCode = "it";
export const getMessages = () => {
  // const querySnapshot = await getDocs(collection(firestore, "messages"));
  const messageRef = collection(firestore, "messages");
  return messageRef;
};

export default firebaseApp;
