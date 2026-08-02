import {useLoginMutation} from "@/features/auth/api/authApi";
import {Path} from "@/common/routing";

export const Login = () => {
  const [login] = useLoginMutation()

  const loginHandler = () => {
    const redirectUri = import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect

    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`

    window.open(url, 'oauthPopup', 'width=600,height=700')

    const receiveMessage = (e: MessageEvent) => {
      if(e.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return

      const {code} = e.data
      if(!code) return

      window.removeEventListener('message', receiveMessage)

      login({code, redirectUri, rememberMe: false})
    }

    window.addEventListener('message', receiveMessage)


  }

  return (
    <button type={'button'} onClick={loginHandler}>
      login
    </button>
  )
}