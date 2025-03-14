import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../index.css"
import '@fontsource/vazirmatn';
import '@fontsource/vazirmatn/700.css';
import "boxicons/css/boxicons.min.css";
import BmVideo from "/videos/Bm.mp4";
import UpVideo from "/videos/Up.mp4";
import AudiVideo from "/videos/Audi.mp4";
import { Header, HeroSection, Service, Reel, Whatsapp, Instagram, Counter, AboutUs, Footer, FAQ } from "../componentes.jsx"

const Home = () => {

  return (
    <div>
    <Header />
    <HeroSection />
    <div className='service'>
      <Service p="Publicamos" span="100% gratis!" img="/static/publish.webp" alt="Publicamos tu auto gratis"/>
      <Service p="Amplia variedad" span="en stock" img="/static/stock.webp" alt="Amplia la variedad en stock"/>
      <Service p="Cotiza tu" span="vehículo usado!" img="/static/cotiza.webp" alt="cotiza tu vehiculo usado"/>
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
      <Counter target={5} label="Años de experiencia" />
      <Counter target={28} label="Clientes satisfechos" />
      <Counter target={14} label="Vehiculos en stock" />
      </div>
    </section>
    <AboutUs />
    <FAQ />
    <Footer />
  </div>
  )
}
  
export { Home };