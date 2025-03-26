import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../pages/home.jsx"
import { Contact } from "../pages/contact.jsx";
import { Stock } from "../pages/stock.jsx";
import { Login } from "../pages/login.jsx";
import { Register } from "../pages/register.jsx";

import { SubmitedForm } from "../pages/submitedForm.jsx";
import { AuthContext } from "../../../context/authContext";
import { useContext } from "react";


const Router = () => {
  const { user } = useContext(AuthContext); // ¡Aquí definimos `user`!

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export { Router };
