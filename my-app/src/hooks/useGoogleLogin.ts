import type { CredentialResponse } from '@react-oauth/google'
import { useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { processGoogleLogin } from '../services/auth/googleAuth'
import { AUTH_ERROR_CODES, logAuthError } from '../utils/authErrors'

/**
 * Encapsulates Google login success/error handling.
 * Components stay UI-only; all business logic lives here and in services.
 */
export function useGoogleLoginHandlers() {
  const { setUser, setIsLoading } = useAuth()

  const handleSuccess = useCallback(
    async (credentialResponse: CredentialResponse) => {
      setIsLoading(true)

      try {
        const credential = credentialResponse.credential

        if (!credential) {
          throw new Error('No credential received from Google.')
        }

        // Decode JWT and extract user profile fields
        const { user, decoded } = await processGoogleLogin(credential)

        // Required: log the decoded user object on successful login
        console.log('Decoded Google user:', user)
        console.log('Full decoded JWT payload:', decoded)

        // Store user in global auth context
        setUser(user)

        // Future MERN step: send credential to Express backend for verification
        // const session = await authenticateWithBackend(credential)
        // if (session) setUser(session.user)
      } catch (error) {
        logAuthError(AUTH_ERROR_CODES.DECODE_FAILED, error)
      } finally {
        setIsLoading(false)
      }
    },
    [setUser, setIsLoading],
  )

  const handleError = useCallback(() => {
    logAuthError(
      AUTH_ERROR_CODES.GOOGLE_LOGIN_FAILED,
      new Error('Google login was cancelled or failed.'),
    )
  }, [])

  return { handleSuccess, handleError }
}

// Re-export for hooks that need backend auth in the future
export { authenticateWithBackend } from '../services/auth/googleAuth'
