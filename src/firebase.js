// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your Firebase configuration object from the Firebase console
const firebaseConfig = {
  apiKey: "AIzaSyDPuIHh1F0E9h9B8YcmlTlABeZK6Kzy0lw",
  authDomain: "todo-7d820.firebaseapp.com",
  projectId: "todo-7d820",
  storageBucket: "todo-7d820.appspot.com",
  messagingSenderId: "531207489987",
  appId: "1:531207489987:web:4187879db47f5403cb9576"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

export { db };



  