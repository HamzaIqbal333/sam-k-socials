import { getAuth } from "firebase/auth";
import { firebaseApp, firebaseEnabled } from "./firebase";

// Split out of firebase.js on purpose: this is the only file in the app that imports
// firebase/auth, and it's only ever imported (transitively) by the lazy-loaded admin
// panel — see src/pages/admin/AdminApp.jsx — so public visitors never fetch this SDK.
export const auth = firebaseEnabled ? getAuth(firebaseApp) : null;
