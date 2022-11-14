import {useState} from 'react'
import {GOOGLE_SIGN_IN_ELEMENT_ID} from '../constants'
import useInterval from 'use-interval'
import {handleLogIn} from '../utils/handleLogIn'
//one element in the app should be provided with the ID in GOOGLE_SIGN_IN_ELEMENT_ID in order for the
//button to be rendered
export const useMyGoogleAuthentication = () => {
  const handleCallbackResponse = (googleResponse: CredentialResponse) => {
    handleLogIn(googleResponse)
  }
  //used to try to trigger useEffect when google script included in index.html is finally present
  const [googleIsLoading, setGoogleIsLoading] = useState(true);
  useInterval( () => {
      if (typeof window !== "undefined" && window.google) {
        setGoogleIsLoading(false)
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID!,
          callback: handleCallbackResponse,
        })
        window.google.accounts.id.prompt();
        window.google.accounts.id.renderButton(
          document.getElementById(GOOGLE_SIGN_IN_ELEMENT_ID)!,
          {type: 'icon', text: 'signin_with', theme:'outline', size: 'large', shape: 'circle'}
        )
      }
    },
    googleIsLoading ? 100 : null
  );
}