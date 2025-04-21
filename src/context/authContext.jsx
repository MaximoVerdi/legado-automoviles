import { createContext, useContext, useEffect, useState } from "react";
import { 
  auth, 
  db 
} from "../firebase";
import { 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged 
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado separado para admin
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Función de login
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 2. Función de logout
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // 3. Observer de estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          // Lista de emails admin (puedes mover esto a variables de entorno si prefieres)
          const adminEmails = [
            "maximoverdi21@gmail.com",
            "machuverdi@gmail.com"
          ].map(e => e.toLowerCase());
          
          const userEmail = currentUser.email.toLowerCase();
          
          // Verificar si es admin
          setIsAdmin(adminEmails.includes(userEmail));
          setUser(currentUser);
          
          console.log(`Usuario ${userEmail} es admin:`, adminEmails.includes(userEmail)); // Debug
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error en auth observer:", error);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 4. Proveedor de contexto
  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAdmin, // Asegúrate de incluir isAdmin aquí
        loading,
        error,
        login,
        logout
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};