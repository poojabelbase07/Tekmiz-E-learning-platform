// src/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
// REPLACE these values with your actual Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyChk7yqJwp1Kz03NzzJv6geGC0SElhIdTw",
  authDomain: "tekmiz-e-learning-platform.firebaseapp.com",
  projectId: "tekmiz-e-learning-platform",
  storageBucket: "tekmiz-e-learning-platform.firebasestorage.app",
  messagingSenderId: "137470775937",
  appId: "1:137470775937:web:0d5863f82a6768f047f380",
  measurementId: "G-VGJE544VYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database
export const db = getFirestore(app);

// Initialize Firebase Storage
export const storage = getStorage(app);

export default app;


