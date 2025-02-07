import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import '@fontsource/vazirmatn';
import '@fontsource/vazirmatn/700.css';
import "boxicons/css/boxicons.min.css";
import BmVideo from "../bm.mp4"
import UpVideo from "../up.mp4"
import AudiVideo from "../audi.mp4"
import { Header, HeroSection, Service, Reel, Whatsapp, Instagram, Counter, AboutUs } from "./componentex.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HeroSection />
    <div className='service'>
      <Service p="Publicamos" span="100% gratis!" img="src/assets/images/publish.webp" alt="Publicamos tu auto gratis"/>
      <Service p="Amplia variedad" span="en stock" img="src/assets/images/stock.webp" alt="Amplia la variedad en stock"/>
      <Service p="Cotiza tu" span="vehículo usado!" img="src/assets/images/cotiza.webp" alt="Cotiza tu vehículo usado"/>
    </div>
    <div className='reels-section'>
        <h2>Vende tu auto con nosotros</h2>
      <div className='reels'>
        <Reel video={AudiVideo} alt="Video de ejemplo" />
        <Reel video={UpVideo} alt="Video de ejemplo" />
        <Reel video={BmVideo} alt="Video de ejemplo" />
      </div>
    </div>
    <Whatsapp />
    <Instagram />

    <section id="experience" className="stats">
      <div className="stats-container">
      <Counter target={6} label="Años de experiencia" />
      <Counter target={22} label="Clientes satisfechos" />
      <Counter target={12} label="Vehiculos en stock" />
      </div>
    </section>
    <AboutUs />
  </StrictMode>
)
