import { useState, useEffect } from "react";
import "./header.css";
import { NavItem } from "../navItems/navItem";
import "../index.css"
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/authContext";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

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
                <Link to="/"><span>Legado</span> Automóviles</Link>
            </div>

            {/* Menú de navegación */}
            <nav className={`header__nav ${menuOpen ? "open" : ""}`}>
                <ul className="header__nav-list">
                  <NavItem href="/" section="Inicio" closeMenu={closeMenu} />
                  <NavItem href="/" section="Servicios" closeMenu={closeMenu} />
                  <NavItem href="/stock" section="Stock" closeMenu={closeMenu} />
                  <NavItem href="/contact" section="Contacto" closeMenu={closeMenu} />
                   {/* Mostrar según autenticación */}
                   {user ? (
                      <button className="header__logout" onClick={logout}>Cerrar sesión</button>
                    ) : (
                        <NavItem href="/login" section="login" closeMenu={closeMenu} /> 
                    )}
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
