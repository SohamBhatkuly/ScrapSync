// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoua-9rqGU-YkZGPfzSWYOPc6FsLEVDlA",
  authDomain: "scrapsync-cad51.firebaseapp.com",
  projectId: "scrapsync-cad51",
  storageBucket: "scrapsync-cad51.firebasestorage.app",
  messagingSenderId: "36105185189",
  appId: "1:36105185189:web:5db364151f4f795e89ea4c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);