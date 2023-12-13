// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA17F0336JMPhKG5jgxTVAyjgeHSkiAbOs",
  authDomain: "quickrent-rental-system-4b137.firebaseapp.com",
  projectId: "quickrent-rental-system-4b137",
  storageBucket: "quickrent-rental-system-4b137.appspot.com",
  messagingSenderId: "984287518782",
  appId: "1:984287518782:web:e327dcb2de1d20a05db16f",
  measurementId: "G-6YPB9WKZ18"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const imgStorage = getStorage(app);
const docStorage = getFirestore(app);


export { imgStorage, docStorage };
