// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBf3D0yEGLxP6klOnzw0_uJsGv9BBoyW94",
  authDomain: "metflixgpt-e6c3c.firebaseapp.com",
  projectId: "metflixgpt-e6c3c",
  storageBucket: "metflixgpt-e6c3c.firebasestorage.app",
  messagingSenderId: "813429048948",
  appId: "1:813429048948:web:a2c77bc03927fd62527321",
  measurementId: "G-WHZG86NQV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
