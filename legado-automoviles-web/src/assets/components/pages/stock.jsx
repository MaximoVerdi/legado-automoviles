import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../index.css"
import '@fontsource/vazirmatn';
import '@fontsource/vazirmatn/700.css';
import "boxicons/css/boxicons.min.css";
import BmVideo from "../../../assets/Bm.webm";
import UpVideo from "../../../assets/Up.webm";
import AudiVideo from "../../../assets/Audi.webm";
import { Header, HeroSection, Service, Reel, Whatsapp, Instagram, Counter, AboutUs, Footer, FilterSection } from "../componentex.jsx"

createRoot(document.getElementById('root-stock')).render(
  <StrictMode>
        <Header />
        <HeroSection />
        <FilterSection  />
        <Footer />
        <Whatsapp />
        <Instagram />
  </StrictMode>
)
