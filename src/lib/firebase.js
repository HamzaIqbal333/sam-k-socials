import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// All values come from env vars so nothing here is a real secret in source control.
// See .env.example for what to fill in once the Firebase project exists.
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Lets the whole app (public pages, hooks, admin panel) run and build cleanly
// before a real Firebase project is wired up, falling back to demo content instead of crashing.
export const firebaseEnabled = Boolean(config.apiKey && config.projectId);

// Every public page imports this file (via useContent) for Firestore, so it deliberately
// does NOT touch firebase/auth — that's in ./firebaseAuth.js, imported only by the admin
// panel's AuthContext, so visitors never download the auth SDK. See src/pages/admin/AdminApp.jsx.
export const firebaseApp = firebaseEnabled ? (getApps()[0] ?? initializeApp(config)) : null;

export const db = firebaseEnabled ? getFirestore(firebaseApp) : null;
