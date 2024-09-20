import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDofZZ-wdZKEC2TiV60Ux0H4LuOkGTHHss",
  authDomain: "hearingapp-24861.firebaseapp.com",
  projectId: "hearingapp-24861",
  storageBucket: "hearingapp-24861.appspot.com",
  messagingSenderId: "899501693571",
  appId: "1:899501693571:web:62f8c5969f641e847119b6",
  measurementId: "G-K1MKSECH28"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase


const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getFirestore(app);

export { auth, db };