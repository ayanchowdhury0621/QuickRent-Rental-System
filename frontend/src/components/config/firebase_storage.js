import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgsmXIpOsATAWsYEzeuGQsXfDQx97mxoQ",
  authDomain: "quickrent-rental-system-407522.firebaseapp.com",
  projectId: "quickrent-rental-system-407522",
  storageBucket: "quickrent-rental-system-407522.appspot.com",
  messagingSenderId: "241420795370",
  appId: "1:241420795370:web:78cc7531546ee5927dc693"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgStorage = getStorage(app);
const docStorage = getFirestore(app);

export { imgStorage, docStorage };
