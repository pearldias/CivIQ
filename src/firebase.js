// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { initializeApp } from "firebase/app";
import { Firestore, getFirestore} from "firebase/firestore";
import { getStorage, } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import "firebase/storage"
import { getMessaging, getToken } from "firebase/messaging";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, where,query, deleteField, Timestamp, arrayUnion  } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyC4QsyM6qwGvKzZ6Po-SnJGlJFgebU_j9c",
  authDomain: "civiq-68f7f.firebaseapp.com",
  projectId: "civiq-68f7f",
  storageBucket: "civiq-68f7f.firebasestorage.app",
  messagingSenderId: "1080338069876",
  appId: "1:1080338069876:web:2b9401c817587c17cf9421"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

// Initialize Firebase
// const app = initializeApp(firebaseConfig);