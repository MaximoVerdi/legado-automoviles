// src/pages/Register.jsx
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore
import { auth, db } from "../../../firebase"; // Asegúrate de exportar 'db' en firebase.js
import { useNavigate } from "react-router-dom";
import "./userForms.css";
import { Header } from "../componentes";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // 2. Guardar datos adicionales en Firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        createdAt: new Date(),
        // Agrega más campos si necesitas:
        role: "user",
      });

      // 3. Redirigir al área privada
      navigate("/stock");
      alert("¡Usuario registrado!");

    } catch (error) {
      // Manejo de errores
      console.error("Error en registro:", error);
      
      if (error.code === "auth/email-already-in-use") {
        alert("Este correo ya está registrado. Inicia sesión.");
        navigate("/login");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña debe tener al menos 6 caracteres.");
      } else {
        alert("Error desconocido: " + error.message);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="login-form">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
            />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña (mínimo 6 caracteres)"
            minLength={6}
            required
            />
          <button type="submit">Registrarse</button>
        </form>
        <p>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
      </div>
    </>
  );
};