// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth,GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rivaai-fa992.firebaseapp.com",
  projectId: "rivaai-fa992",
  storageBucket: "rivaai-fa992.firebasestorage.app",
  messagingSenderId: "766272034004",
  appId: "1:766272034004:web:52d9122f5bc7c96c379741"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}