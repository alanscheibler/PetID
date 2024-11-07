import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC01co1SiP3GH8XcLCGzKw5L93en5xxleA",
  authDomain: "petid-bf889.firebaseapp.com",
  projectId: "petid-bf889",
  storageBucket: "petid-bf889.appspot.com",
  messagingSenderId: "774165023391",
  appId: "1:774165023391:web:a40653b1a27ed7a4e670aa",
  measurementId: "G-6ZP1398G80"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app) || initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth, storage };
