import { initializeApp } from "firebase/app";
import { getAnalytics,  isSupported  } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});


export {db, auth};
