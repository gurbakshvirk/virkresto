// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import './index.css'
// import App from './App.jsx'
// import { ToastContainer } from 'react-toastify'
// import { AuthProvider } from "./context/authcontext.jsx";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//      <AuthProvider>
//         <App />
//         </AuthProvider>
//     </BrowserRouter>

//     <ToastContainer position="top-right" autoClose={3000} />
//   </StrictMode>
// )



import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthProvider } from "./context/authcontext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* ✅ Must be inside React tree */}
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
