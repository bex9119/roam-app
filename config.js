import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCQJAZBAIREK7TmVklQTANa3XhN8Fbgmhk",
  authDomain: "roam-app-c6dba.firebaseapp.com",
  projectId: "roam-app-c6dba",
  storageBucket: "roam-app-c6dba.appspot.com",
  messagingSenderId: "87140961989",
  appId: "1:87140961989:web:5e468f6769d2fa8dbbeaac",
};
  
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);


