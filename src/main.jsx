import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './assets/components/routes/router';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Router />
  </StrictMode>
);
