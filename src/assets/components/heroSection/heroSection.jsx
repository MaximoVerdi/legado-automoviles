import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./heroSection.css"
import "../index.css";
import '@fontsource/montserrat'; // Fuente normal
import '@fontsource/montserrat/700.css'; // Fuente en negrita

const HeroSection = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "<strong>Compra</strong> tu usado!", 
        "<strong>Vendemos</strong> tu vehículo"
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      contentType: "html"
    });

    return () => typed.destroy();
  }, []);

  return (
    <section className="hero">
      <section>
        <div class="skewed"></div>
      </section>
      <div className="overlay"></div>
      <h2>
        <span ref={typedRef}></span>
      </h2>
      <p id="service__item">Realizamos toda la preparación previa a la venta y los trámites legales necesarios!</p>
      {/* <button className="hero__btn">Contactanos</button> */}

    </section>
  );
};

export { HeroSection };
