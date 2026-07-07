import { jwtDecode } from 'jwt-decode'
import { getApiBaseUrl } from '../../config/env'
import type {
  BackendAuthResponse,
  GoogleJwtPayload,
  GoogleLoginResult,
  GoogleUser,
} from '../../types/auth'

/**
 * Decodes the Google JWT credential returned by @react-oauth/google.
 * The credential is a signed ID token — decoding is for client-side display only.
 * Your Express backend must verify the token server-side before trusting it.
 */
export function decodeGoogleCredential(credential: string): GoogleJwtPayload {
  if (!credential) {
    throw new Error('Google credential token is missing.')
  }

  return jwtDecode<GoogleJwtPayload>(credential)
}

/**
 * Maps the decoded JWT payload into a clean, app-friendly user object.
 */
export function formatGoogleUser(decodedToken: GoogleJwtPayload): GoogleUser {
  return {
    googleId: decodedToken.sub,
    name: decodedToken.name ?? '',
    email: decodedToken.email ?? '',
    picture: decodedToken.picture ?? '',
  }
}

/**
 * Full client-side login pipeline:
 * decode token → format user data → return both for logging and future API calls.
 */
export async function processGoogleLogin(
  credential: string,
): Promise<GoogleLoginResult> {
  const decoded = decodeGoogleCredential(credential)
  const user = formatGoogleUser(decoded)

  return {
    credential,
    decoded,
    user,
  }
}

/**
 * Sends the Google credential to your Express backend for verification.
 * Uncomment and call this from the login hook once your MERN API is ready.
 *
 * Expected backend route: POST /api/auth/google
 * Body: { credential: "<google-jwt>" }
 */
export async function authenticateWithBackend(
  credential: string,
): Promise<BackendAuthResponse | null> {
  const apiBaseUrl = getApiBaseUrl()

  if (!apiBaseUrl) {
    console.warn(
      '[googleAuth] VITE_API_BASE_URL is not set. Skipping backend authentication.',
    )
    return null
  }

  const response = await fetch(`${apiBaseUrl}/api/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ credential }),
  })

  if (!response.ok) {
    const errorBody = (await response.json().catch(() => ({}))) as {
      message?: string
    }
    throw new Error(errorBody.message ?? 'Backend authentication failed.')
  }

  return response.json() as Promise<BackendAuthResponse>
}
