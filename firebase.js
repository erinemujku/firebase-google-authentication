import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDcKE8jbb3WbLlv8VsE9vlumpAEVAgcqa4",
  authDomain: "fir-authentication-54499.firebaseapp.com",
  projectId: "fir-authentication-54499",
  storageBucket: "fir-authentication-54499.firebasestorage.app",
  messagingSenderId: "186347655916",
  appId: "1:186347655916:web:646e3920ab2661594fcbc9",
  measurementId: "G-GS5DV3KY90"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export { app, analytics };