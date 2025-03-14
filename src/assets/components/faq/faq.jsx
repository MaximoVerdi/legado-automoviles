import React, { useState, useEffect } from "react";
import "./faq.css";
import AOS from "aos";
import "aos/dist/aos.css";

const faqData = [
  {
    question: "Legado Automóviles compra autos?",
    answer: "No, nosotros no compramos autos directamente. Nos encargamos de publicar vehículos de personas que desean venderlos, ayudándolos a encontrar compradores de manera más rápida y segura.",
  },
  {
    question: "Cómo puedo publicar mi auto en su plataforma",
    answer: "Si deseas vender tu auto, contactanos a través de nuestro correo: legadogarage@gmail.com y envianos la información del vehículo (marca, modelo, año, kilometraje, fotos y precio). Nos encargamos de publicar el anuncio y gestionar las consultas de posibles compradores.",
  },
  {
    question: "Qué tipo de autos publican?",
    answer: "Publicamos vehículos de todas las marcas y modelos, siempre que cumplan con ciertos requisitos de documentación y estado general.",
  },
  {
    question: "Cuánto tiempo tarda en venderse un auto?",
    answer: "El tiempo de venta varía según la demanda del mercado, el estado del vehículo y su precio. Nos aseguramos de optimizar la visibilidad de cada anuncio para aumentar las posibilidades de venta en el menor tiempo posible.",
  },
  {
    question: "Tienen algún costo los servicios de publicación?",
    answer: "Dependiendo del tipo de publicación y visibilidad que elijas, podemos ofrecer opciones gratuitas y destacadas con promoción adicional. Contactanos para conocer más sobre nuestros planes.",
  },
  {
    question: "Cómo puedo coordinar una visita para ver un auto en venta?",
    answer: "Si te interesa un auto, puedes comunicarte con nosotros para coordinar una cita con el vendedor y ver el vehículo en persona.",
  },
  {
    question: "Cómo garantizan la seguridad en las transacciones?",
    answer: "Siempre recomendamos realizar las transacciones en lugares seguros y verificar la documentación del vehículo antes de concretar la compra. Podemos brindarte asesoramiento para hacer la operación de manera segura.",
  },
  {
    question: "Puedo financiar la compra de un auto?",
    answer: "Por el momento, no ofrecemos financiamiento directo, pero algunos vendedores pueden aceptar planes de pago. Te recomendamos consultar en cada caso.",
  },
  {
    question: "Qué debo verificar antes de comprar un auto usado?",
    answer: "Es importante revisar la documentación, el estado mecánico y la historia del vehículo. Si tenes dudas, podes llevar el auto a un mecánico de confianza antes de cerrar la compra.",
  },

];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Inicializar AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Función para alternar la respuesta
  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
      <div className="questions-container">
      <h2>Preguntas Frecuentes</h2>
      {faqData.map((item, index) => (
        <div key={index} className="faq-item">
          <div
            className="faq-question"
            onClick={() => toggleAnswer(index)}
          >
            <h3>{item.question}</h3>
            <span>{activeIndex === index ? "-" : "+"}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          )}
        </div>
      ))}
      </div>
    </div>
  );
};

export { FAQ };