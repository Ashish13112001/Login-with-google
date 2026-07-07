import { GoogleOAuthProvider } from '@react-oauth/google'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { getGoogleClientId } from './config/env'
import './index.css'

/**
 * GoogleOAuthProvider must wrap the entire app so any child component
 * can use Google OAuth hooks and the GoogleLogin button.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={getGoogleClientId()}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
