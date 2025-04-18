// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqpNgWmi5hDPdXWLzDc1S9NNA8tda02eA",
  authDomain: "lucky-draw-42.firebaseapp.com",
  projectId: "lucky-draw-42",
  storageBucket: "lucky-draw-42.firebasestorage.app",
  messagingSenderId: "482288836513",
  appId: "1:482288836513:web:689f2e36e5293e0fcf35e0",
  measurementId: "G-749BV5G00B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firestore
const db = getFirestore(app);

export { analytics, db };
