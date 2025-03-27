import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "legado-automoviles.firebaseapp.com",
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
};

let auth, db;

try {
  if (import.meta.env.MODE === "development" && getApps().length > 0) {
    await Promise.all(getApps().map((app) => deleteApp(app)));
  }

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  console.log("✅ Firebase inicializado correctamente");
} catch (error) {
  console.error("🔥 Error fatal al inicializar Firebase:", error);
  throw new Error("Verifica tus variables de entorno en .env");
}

export { auth, db };
