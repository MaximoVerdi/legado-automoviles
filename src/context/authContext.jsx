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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          const adminEmails = [
            "maximoverdi21@gmail.com",
            "machuverdi@gmail.com"
          ].map(e => e.toLowerCase());
          
          const userEmail = currentUser.email.toLowerCase();
          
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

  return (
    <AuthContext.Provider 
      value={{ 
        user,
        isAdmin,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
};