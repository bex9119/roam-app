import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore'
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyABXsr6FE4vCv6whZex4ZLbpvi3qopxY18",
    authDomain: "roam-firebase-4bc9f.firebaseapp.com",
    projectId: "roam-firebase-4bc9f",
    storageBucket: "roam-firebase-4bc9f.appspot.com",
    messagingSenderId: "561000528696",
    appId: "1:561000528696:web:5f890c82fac57c484c9fcd"
  };
  
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 
export const db = getFirestore(app);


