import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAX_XbRlZihqjBUZcuT3xJIcd8JBq_8650",
  authDomain: "tally-yo.firebaseapp.com",
  projectId: "tally-yo",
  storageBucket: "tally-yo.appspot.com",
  messagingSenderId: "171103732213",
  appId: "1:171103732213:web:13479defa3f4e2134ba0bc",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
