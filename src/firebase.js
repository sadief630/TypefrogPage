// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
import { getDatabase } from "firebase/database";
import {getAuth} from "firebase/auth";
import { getPerformance } from "firebase/performance";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaF9aQ51T-9eyFIj7DgAFBaoxEpz4rxC8",
  authDomain: "typefrog-746fc.firebaseapp.com",
  databaseURL: "https://typefrog-746fc-default-rtdb.firebaseio.com",
  projectId: "typefrog-746fc",
  storageBucket: "typefrog-746fc.appspot.com",
  messagingSenderId: "553422953561",
  appId: "1:553422953561:web:a2e95bc8765139c63c6548",
  measurementId: "G-BGBR3F4SQQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const perf = getPerformance(app);
export const database = getDatabase();
export const auth = getAuth(app);
export const storage = getStorage(app);

