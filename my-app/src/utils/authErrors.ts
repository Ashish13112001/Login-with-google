import {
  AUTH_ERROR_CODES,
  type AuthError,
  type AuthErrorCode,
} from '../types/auth'

export { AUTH_ERROR_CODES }

/**
 * Logs auth errors consistently and returns a normalized error object.
 * Reusable anywhere authentication can fail (components, hooks, services).
 */
export function logAuthError(
  code: AuthErrorCode,
  error: unknown,
  context: Record<string, unknown> = {},
): AuthError {
  const message =
    error instanceof Error ? error.message : 'Authentication failed.'

  const normalizedError: AuthError = {
    code,
    message,
    context,
    timestamp: new Date().toISOString(),
  }

  console.error(`[Auth Error] ${code}:`, normalizedError, error)

  return normalizedError
}
