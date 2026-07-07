import GoogleLoginButton from '../components/auth/GoogleLoginButton'

/**
 * Login page — renders the reusable Google OAuth button inside a styled card.
 * Business logic is fully delegated to GoogleLoginButton and its hook/service layer.
 */
export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-gray-50 to-indigo-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white px-6 py-8 shadow-xl shadow-gray-200/60 sm:px-8 sm:py-10">
          <h1 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Login
          </h1>
          <p className="mb-8 text-center text-sm text-gray-500">
            Sign in with your Google account to continue
          </p>

          <GoogleLoginButton />

          <p className="mt-8 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a
              href="#"
              className="font-semibold text-indigo-600 transition-colors hover:text-indigo-500 focus:outline-none focus:underline"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
