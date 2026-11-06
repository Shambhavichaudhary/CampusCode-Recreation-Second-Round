import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/animations.css'; // global animation layer (glow, hover lift, dots, transitions)

// Entry point: mounts <App /> into <div id="root"> from index.html.
// BrowserRouter turns the address bar (/login, /register ...) into the page shown.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
