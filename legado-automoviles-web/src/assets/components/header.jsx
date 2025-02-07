import { useState, useEffect } from "react";
import "./Header.css";
import { NavItem } from "./NavItem";
import "./index.css";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Función para cerrar el menú al hacer clic en un link
    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="header__logo">
                <span>Legado Automóviles</span>
            </div>

            {/* Menú de navegación */}
            <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
                <ul className="header__nav-list">
                  <NavItem section="Inicio" closeMenu={closeMenu} />
                  <NavItem section="Servicios" closeMenu={closeMenu} />
                  <NavItem section="Stock" closeMenu={closeMenu} />
                  <NavItem section="Nosotros" closeMenu={closeMenu} />
                  <NavItem section="Faq" closeMenu={closeMenu} />
                </ul>
            </nav>

            {/* Botón menú hamburguesa */}
            <div 
                className={`header__toggle ${menuOpen ? "open" : ""}`} 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <div></div>
                <div></div>
                <div></div>
            </div>
        </header>
    );
};

export { Header };
