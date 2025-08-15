// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth"; // Import these
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"; // Import this

const firebaseConfig = {
  apiKey: "AIzaSyCXN61q_0sdlqBxUnD5kjg7eIllJZxTwl4",
  authDomain: "afo-app-backend.firebaseapp.com",
  projectId: "afo-app-backend",
  storageBucket: "afo-app-backend.firebasestorage.app",
  messagingSenderId: "614382783696",
  appId: "1:614382783696:web:97c71da58b06a0ef5222d5",
  measurementId: "G-7PDBSQFB01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { app, auth, db };
