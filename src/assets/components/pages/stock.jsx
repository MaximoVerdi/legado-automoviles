import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../index.css"
import '@fontsource/vazirmatn';
import '@fontsource/vazirmatn/700.css';
import { Header, HeroSection, Whatsapp, Instagram, Footer, CarsStockSection, FAQ } from "../componentes.jsx"


const Stock = () => {

  return (
      <div>
        <Header />
        <CarsStockSection  />
        <FAQ />
        <Footer />
        <Whatsapp />
      </div>
  )
}

export { Stock }
