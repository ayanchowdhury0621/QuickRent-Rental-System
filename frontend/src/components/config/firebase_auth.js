// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9lwvMc-QeUrgHehlryJOzUgKE4bpdbxE",
  authDomain: "quickrent-rental-system.firebaseapp.com",
  projectId: "quickrent-rental-system",
  storageBucket: "quickrent-rental-system.appspot.com",
  messagingSenderId: "289834522991",
  appId: "1:289834522991:web:a64233f89ae5d76e6eb09a",
  measurementId: "G-J5SCVTW3TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
export default auth;