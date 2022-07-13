// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD03fzy7mj7CA8rB0h1yN0XDLfyX3vTA7Q",
  authDomain: "apideployusers.firebaseapp.com",
  projectId: "apideployusers",
  storageBucket: "apideployusers.appspot.com",
  messagingSenderId: "609618507337",
  appId: "1:609618507337:web:900baaea5330e835d6b198",
  measurementId: "G-R5HSXYFQSG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)