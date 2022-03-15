


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDrlyHOKErSreKgWHERFSkUKpOD0YbUwmg",
    authDomain: "hepee-4e550.firebaseapp.com",
    projectId: "hepee-4e550",
    storageBucket: "hepee-4e550.appspot.com",
    messagingSenderId: "943049095020",
    appId: "1:943049095020:web:6ef165ec527052c979a549"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app)