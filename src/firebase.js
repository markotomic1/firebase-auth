// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAofgjd2RxlRwj9fa8e6SpM5HPrDsDsWds",
  authDomain: "fir-basics-982cc.firebaseapp.com",
  projectId: "fir-basics-982cc",
  storageBucket: "fir-basics-982cc.appspot.com",
  messagingSenderId: "673372675828",
  appId: "1:673372675828:web:41758e063bd93498c648a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
