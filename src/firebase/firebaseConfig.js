// Import the functions you need from the SDKs you need
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCe4JSWQ222cfyXpmX00jXo2tSyYgrvUxk",
  authDomain: "abarrotao-92241.firebaseapp.com",
  projectId: "abarrotao-92241",
  storageBucket: "abarrotao-92241.appspot.com",
  messagingSenderId: "570603830237",
  appId: "1:570603830237:web:b684360994c39d759a9434",
  measurementId: "G-HDKWMVY9RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const dataBase = getFirestore(app);
export const google = new GoogleAuthProvider();

// const analytics = getAnalytics(app);
