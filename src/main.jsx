import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { RBACProvider } from './components/rbac/context/RBACContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RBACProvider>
        <App />
      </RBACProvider>
    </BrowserRouter>
  </StrictMode>,
)
