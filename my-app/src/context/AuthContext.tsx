import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { AuthContextValue, GoogleUser } from '../types/auth'

/**
 * AuthContext stores the authenticated user globally.
 * When you connect a MERN backend, this context will hold
 * the user returned from your Express API (not just Google profile data).
 */
const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<GoogleUser | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      setUser,
      isLoading,
      setIsLoading,
      isAuthenticated: Boolean(user),
    }),
    [user, isLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * Custom hook to access auth state from any component.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
