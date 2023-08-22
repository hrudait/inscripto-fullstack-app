// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwYjqgrG25miXU4rMRUIAEUazwnx0vEr4",
  authDomain: "inscripto-108a6.firebaseapp.com",
  projectId: "inscripto-108a6",
  storageBucket: "inscripto-108a6.appspot.com",
  messagingSenderId: "339802126809",
  appId: "1:339802126809:web:7b4670036653c80f4e41c8",
  measurementId: "G-95LE92B7VN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)