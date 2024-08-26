import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import { getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyDhtioBP3qKHrWekBkqsQgYagB0a7fyRR8",
//   authDomain: "ngoproject-7e7b5.firebaseapp.com",
//   projectId: "ngoproject-7e7b5",
//   storageBucket: "ngoproject-7e7b5.appspot.com",
//   messagingSenderId: "868218736396",
//   appId: "1:868218736396:web:0434a9d6b28e593b3d4329"
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const database=getFirestore(app); 
export const firebaseApp = getApp();
export const storage=getStorage(app)
export default app;