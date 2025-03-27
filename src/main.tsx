//import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import Nav from './components/Navigation.tsx';

createRoot(document.getElementById('root')!).render(
  <>
  <Nav />
  <App />
  </>
  
);
