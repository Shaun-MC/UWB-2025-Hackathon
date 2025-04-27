import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, setDoc, doc, orderBy } from "firebase/firestore";

// use your own .env to fill in the values
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // note lowercase "d"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the crisis posts from the DB (Tweets, instagram posts, TikToks, etc.)
export const getCrisis = async(crisisType) => {
    try {
        const crisisList = collection(db, 'crisis');
        const crisisQuery = query(crisisList, where('crisisType', '==', crisisType));
        const crisisSnapshot = await getDocs(crisisQuery);
        console.log(crisisSnapshot.docs.map(doc => doc.data()));
        return crisisSnapshot.docs.map(doc => doc.data());
    } catch (error) {
        throw new Error(error.message);
    }
}

export { db, collection, query, where, getDocs, setDoc, doc, orderBy };