import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyAmogbJMFEltfCwandFBmc9z5tdnZiXvGM",
  authDomain: "floraclick-12952.firebaseapp.com",
  projectId: "floraclick-12952",
  storageBucket: "floraclick-12952.appspot.com",
  messagingSenderId: "900012834976",
  appId: "1:900012834976:web:00c0cff11710bb4991c9c5",
  measurementId: "G-Z5FYWZ1LXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const db = getFirestore(app); 
export {db, auth, app};
