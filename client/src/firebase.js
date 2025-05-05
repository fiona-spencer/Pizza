// firebase.js (or firebase-config.js)
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "pizzaday-9ed0b.firebaseapp.com",
    projectId: "pizzaday-9ed0b",
    storageBucket: "pizzaday-9ed0b.firebasestorage.app",
    messagingSenderId: "798708321526",
    appId: "1:798708321526:web:04d5fe056909558ed870d7",
    measurementId: "G-35J94987JM"
  };
// Initialize Firebase
export const app = initializeApp(firebaseConfig);

