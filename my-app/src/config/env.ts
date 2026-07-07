/**
 * Centralized environment configuration.
 * Never import import.meta.env directly inside components —
 * always read values through this file so config stays in one place.
 */

const env = {
  googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  // Reserved for future MERN backend integration
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
} as const

/**
 * Returns the Google OAuth Client ID from environment variables.
 * Throws early in development if the value is missing.
 */
export function getGoogleClientId(): string {
  const clientId = env.googleClientId

  if (!clientId) {
    throw new Error(
      'VITE_GOOGLE_CLIENT_ID is not defined. Add it to your .env file.',
    )
  }

  return clientId
}

/**
 * Returns the backend API base URL (empty string until backend is connected).
 */
export function getApiBaseUrl(): string {
  return env.apiBaseUrl
}

export default env
