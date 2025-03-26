// Importaciones
import { initializeApp, getApps, deleteApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "legado-automoviles.firebaseapp.com", // ¡Cambiado a firebaseapp.com!
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

// Solución para caché de Firebase
let app;
const apps = getApps();
if (apps.length > 0) {
  app = apps[0];
} else {
  app = initializeApp(firebaseConfig);
}

// Inicialización de servicios
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

// Exportaciones
export { auth, db, analytics };
