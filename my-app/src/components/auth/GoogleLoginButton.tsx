import { GoogleLogin } from '@react-oauth/google'
import { useGoogleLoginHandlers } from '../../hooks/useGoogleLogin'

/**
 * Reusable Google OAuth login button.
 * UI-only component — delegates all logic to useGoogleLoginHandlers hook.
 */
export default function GoogleLoginButton() {
  const { handleSuccess, handleError } = useGoogleLoginHandlers()

  return (
    <div className="flex w-full justify-center [&>div]:w-full [&_iframe]:w-full">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        logo_alignment="left"
        width="384"
      />
    </div>
  )
}
