import type { JwtPayload } from 'jwt-decode'

/** Decoded Google ID token payload */
export interface GoogleJwtPayload extends JwtPayload {
  sub: string
  name?: string
  email?: string
  picture?: string
}

/** Normalized user object used across the app */
export interface GoogleUser {
  googleId: string
  name: string
  email: string
  picture: string
}

/** Result of the client-side Google login pipeline */
export interface GoogleLoginResult {
  credential: string
  decoded: GoogleJwtPayload
  user: GoogleUser
}

/** Expected response shape from the Express backend (future) */
export interface BackendAuthResponse {
  user: GoogleUser
  token?: string
}

export const AUTH_ERROR_CODES = {
  GOOGLE_LOGIN_FAILED: 'GOOGLE_LOGIN_FAILED',
  DECODE_FAILED: 'DECODE_FAILED',
  MISSING_CREDENTIAL: 'MISSING_CREDENTIAL',
  BACKEND_AUTH_FAILED: 'BACKEND_AUTH_FAILED',
} as const

export type AuthErrorCode =
  (typeof AUTH_ERROR_CODES)[keyof typeof AUTH_ERROR_CODES]

export interface AuthError {
  code: AuthErrorCode
  message: string
  context: Record<string, unknown>
  timestamp: string
}

export interface AuthContextValue {
  user: GoogleUser | null
  setUser: (user: GoogleUser | null) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  isAuthenticated: boolean
}
