// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGDr6MYmD5JibBVoMo9AV8xapM8fSF7xw",
  authDomain: "login-auth-42f02.firebaseapp.com",
  projectId: "login-auth-42f02",
  storageBucket: "login-auth-42f02.appspot.com",
  messagingSenderId: "277293260262",
  appId: "1:277293260262:web:79bb6f9e6c2455ae234a27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
export default app;