// src/firebase.js

// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDBnHDe88_aJJzT4wQyqHZyj7B52nb3EHE",
    authDomain: "ajr-faith-journal-restored.firebaseapp.com",
    projectId: "ajr-faith-journal-restored",
    storageBucket: "ajr-faith-journal-restored.appspot.com", // ✅ fixed this
    messagingSenderId: "677317188266",
    appId: "1:677317188266:web:db7bf6ad53ad38f4e30ed3"
};

// Initialize Firebase
const app = initializeApp( firebaseConfig );

// Export Firebase Auth service
export const auth = getAuth( app );
export default app;
