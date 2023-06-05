import jwtDecode from 'jwt-decode'
import {store} from '../../store/store'
import {logIn} from '../../../features/authentication/authenticationSlice'
import {UserData} from '../../../features/authentication/models/AuthenticationState'
import {userAPI} from '../../../features/authentication/userAPI/userAPI'
import {cartAPI} from '../../../features/cart/cartAPI/cartAPI'

export const handleLogIn = (googleResponse: CredentialResponse) => {
  const credential : any = jwtDecode(googleResponse.credential!);
  const userData: UserData = {
    jwtToken: googleResponse.credential!,
    lastName: credential.family_name,
    firstName: credential.given_name,
    email: credential.email,
    picture: credential.picture,
    cartId: '',
    //todo this is a placeholder, value should come from backend
    termsAndConditionsApproved: false
  }

  store.dispatch(logIn(userData))
  //this invalidation is used in case a second log in is done, as rtk query does not refetch if
  //the cache is still valid
  store.dispatch(cartAPI.util.invalidateTags(['UserTag']))
  // @ts-ignore
  store.dispatch(userAPI.endpoints.getCartOfUser.initiate()).then(() => {
    const cartId = store.getState().authentication.cartId
    if(cartId) {
      //we refetch the cart if we log in again
      store.dispatch(cartAPI.endpoints.getCart.initiate(cartId))
    }
  })
}