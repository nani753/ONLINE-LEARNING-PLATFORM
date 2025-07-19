import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6ImliS1VcpHZOrzHtqPsdGUvcpvHiYPI",
  authDomain: "codec-9c832.firebaseapp.com",
  projectId: "codec-9c832",
  storageBucket: "codec-9c832.firebasestorage.app",
  messagingSenderId: "476774877355",
  appId: "1:476774877355:web:33ba4377676f6b19eb8fee",
  measurementId: "G-0KZZ2W16S0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);