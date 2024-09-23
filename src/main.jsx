import { StrictMode } from 'react'// 
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// // import { worker } from './mocks/browser';
// worker.start();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
