import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9tIQRqbmFejLo_2iyMq9nfUwR5QSW3Fk",
    authDomain: "taller3-68bf4.firebaseapp.com",
    projectId: "taller3-68bf4",
    storageBucket: "taller3-68bf4.firebasestorage.app",
    messagingSenderId: "112180479076",
    appId: "1:112180479076:web:6f617f52e15d894c15cb71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 