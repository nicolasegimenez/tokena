import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp | undefined;
let analytics: Analytics | undefined;

export const getFirebaseApp = (): FirebaseApp => {
  if (!app) app = initializeApp(firebaseConfig);
  return app;
};

export const ensureAnalytics = async (): Promise<Analytics | undefined> => {
  if (analytics) return analytics;
  if (typeof window !== "undefined" && (await isSupported())) {
    analytics = getAnalytics(getFirebaseApp());
  }
  return analytics;
};


