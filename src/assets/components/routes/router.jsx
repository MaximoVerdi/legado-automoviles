import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/home.jsx"
import { Contact } from "../pages/contact.jsx";
import { Stock } from "../pages/stock.jsx";
import { SubmitedForm } from "../pages/submitedForm.jsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/submitedform" element={<SubmitedForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Router };
