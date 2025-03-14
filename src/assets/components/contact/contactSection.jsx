import "./contactSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate(); // Usa useNavigate para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un FormData con los datos del formulario
    const formData = new FormData(e.target);

    try {
      // Envía el formulario a Formsubmit
      const response = await fetch("https://formsubmit.co/legadogarage@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/submitedform");
      } else {
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <section className="contact-form">
      <form className="form" onSubmit={handleSubmit}>
        {/* Campo oculto para el asunto del correo */}
        <input
          type="hidden"
          name="_subject"
          value="Nuevo mensaje de contacto"
        />

        {/* Campo oculto para desactivar CAPTCHA (opcional) */}
        <input
          type="hidden"
          name="_captcha"
          value="false"
        />

        {/* Campos del formulario */}
        <span>Ey {name}</span>
        <h2>Contactanos</h2>

        <label htmlFor="name">Your name</label>
        <input
          type="text"
          name="name"
          value={name}
          id="name"
          placeholder="Jon Doe"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">Your email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Jondoe@ejemplo.com"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          rows="4"
          placeholder="Deja un mensaje..."
          required
        ></textarea>

        <button type="submit">Enviar</button>
      </form>
    </section>
  );
};

export { Form };