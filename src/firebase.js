import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBDfRDa4BcIZn4L6Frj2Lh9Rp-HeXmqk9k",
  authDomain: "pizza-pet-project-968d0.firebaseapp.com",
  databaseURL: "https://pizza-pet-project-968d0-default-rtdb.firebaseio.com",
  projectId: "pizza-pet-project-968d0",
  storageBucket: "pizza-pet-project-968d0.appspot.com",
  messagingSenderId: "35835943326",
  appId: "1:35835943326:web:4b2552f76caac48f531e8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const firestoreDb = getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();