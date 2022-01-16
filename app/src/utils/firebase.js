import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuhWtvMx-wJrPa4XuX2B2FMhuUwSaIrrg",
  authDomain: "swopshop-7135f.firebaseapp.com",
  projectId: "swopshop-7135f",
  storageBucket: "swopshop-7135f.appspot.com",
  messagingSenderId: "134909685580",
  appId: "1:134909685580:web:1df86d90629d4f7c23a9e9",
  measurementId: "G-ZWH4FDSVVD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();
const storage = getStorage(app);

export { auth, db, storage };
