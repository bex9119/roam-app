import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyB71DceSIXJslaaayEGgpgH9NeDDqEf3dE",
    authDomain: "roam-firebase.firebaseapp.com",
    projectId: "roam-firebase",
    storageBucket: "roam-firebase.appspot.com",
    messagingSenderId: "501120160148",
    appId: "1:501120160148:web:6fe23b58abae3808f2ff81"
};
  
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db} 
