import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// firebase config
import { firebaseConfig } from "./firebaseConfig";

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore()