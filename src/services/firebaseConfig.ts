// src/services/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDdcMKDy0QWn4uvCEQH9JXVXwe9EkXakuQ",
  authDomain: "appestetica-3af63.firebaseapp.com",
  projectId: "appestetica-3af63",
  storageBucket: "appestetica-3af63.firebasestorage.app",
  messagingSenderId: "302997561453",
  appId: "1:302997561453:web:37b6e476e0cbef03e31f64"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { app, auth, db };