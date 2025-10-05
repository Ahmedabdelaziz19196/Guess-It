import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_GUESSIT_APP_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_GUESSIT_APP_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_GUESSIT_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_GUESSIT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_GUESSIT_APP_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_GUESSIT_APP_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_GUESSIT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
