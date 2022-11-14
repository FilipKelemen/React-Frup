import {store} from '../../store/store';
import {logOut} from '../../../features/authentication/authenticationSlice'

export const handleLogOut = () => {
  //removing the google object
  window.google = undefined;
  store.dispatch(logOut());
}