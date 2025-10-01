import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/icons/css/all.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
