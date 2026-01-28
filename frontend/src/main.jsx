import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from "./context/authcontext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
     <AuthProvider>
        <App />
        </AuthProvider>
    </BrowserRouter>

    <ToastContainer position="top-right" autoClose={3000} />
  </StrictMode>
)
