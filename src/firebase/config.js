// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"; 

// Your Firebase configuration
// REPLACE these values with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyA7GHpasa_66vq6oy9GP2ni4g39FAgLfgE",
  authDomain: "tekmiz-free.firebaseapp.com",
  projectId: "tekmiz-free",
  storageBucket: "tekmiz-free.firebasestorage.app",
  messagingSenderId: "624797274003",
  appId: "1:624797274003:web:1459cc9d3ce85c27812266"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

export const storage = getStorage(app);


export default app;


