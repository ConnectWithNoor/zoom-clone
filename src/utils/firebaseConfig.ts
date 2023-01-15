// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNyVVSVM7ocBNs14WQ1oxidQ-31SzRcc8',
  authDomain: 'zoom-clone-9ef13.firebaseapp.com',
  projectId: 'zoom-clone-9ef13',
  storageBucket: 'zoom-clone-9ef13.appspot.com',
  messagingSenderId: '101969668099',
  appId: '1:101969668099:web:470a52ef7681db39320636',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);
