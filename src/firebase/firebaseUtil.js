// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "screenr-19bc8.firebaseapp.com",
  projectId: "screenr-19bc8",
  storageBucket: "screenr-19bc8.appspot.com",
  messagingSenderId: "1014183344370",
  appId: "1:1014183344370:web:0f2d2c30d14864b047b86b"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();