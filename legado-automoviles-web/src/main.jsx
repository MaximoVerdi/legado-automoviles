import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './header.jsx' 
import HeroSection from './heroSection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <HeroSection />
  </StrictMode>
)
