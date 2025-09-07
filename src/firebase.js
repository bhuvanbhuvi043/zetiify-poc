// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGy_m_nVLug9aYoO9dkJ9Tqj6e3rSU330",
  authDomain: "zetiify-33794.firebaseapp.com",
  projectId: "zetiify-33794",
  storageBucket: "zetiify-33794.firebasestorage.app",
  messagingSenderId: "1088020443938",
  appId: "1:1088020443938:web:3bc654e4e7830f45e8ab7b",
  measurementId: "G-LGM9LPLQS4"
};

// initialize
const app = initializeApp(firebaseConfig);

// exports
export const db = getFirestore(app);
export const auth = getAuth(app); 
