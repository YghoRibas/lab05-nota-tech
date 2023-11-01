import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBuxFXn95KbXHRBY9xP4gcvsSVLehMyyHs",
  authDomain: "nfse-service.firebaseapp.com",
  projectId: "nfse-service",
  storageBucket: "nfse-service.appspot.com",
  messagingSenderId: "377528884952",
  appId: "1:377528884952:web:c39627718d3d8594b601ad",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
