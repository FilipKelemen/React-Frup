import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store/store';
import {AuthenticationState, UserData} from './models/AuthenticationState'

export const AUTHENTICATION_INITIAL_STATE: AuthenticationState = {
  jwtToken: '',
  isLoggedIn: false,
  email: '',
  lastName: '',
  firstName: '',
  picture: '',
  cartId: '',
  termsAndConditionsApproved: false
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: AUTHENTICATION_INITIAL_STATE,
  reducers: {
    logIn: (state, action: PayloadAction<UserData>) => {
      //immer get confused with the spread operator on state
      return {...state,...action.payload, isLoggedIn: true}
    },
    logOut: () => {
      return AUTHENTICATION_INITIAL_STATE;
    },
    appendCartId: (state, action: PayloadAction<string>) => {
      return {...state, cartId: action.payload}
    },
    changeTermsAndConditionsApproval: (state) => {
      return {...state, termsAndConditionsApproved: !state.termsAndConditionsApproved}
    },
  },
});

export const { logIn, logOut, appendCartId, changeTermsAndConditionsApproval} = authenticationSlice.actions;

export const selectAuthenticationData = (state: RootState) => state.authentication;
export const selectIsLoggedIn = (state: RootState) => state.authentication.isLoggedIn;
export const selectUserFirstName = (state: RootState) => state.authentication.firstName;
export const selectUserLastName = (state: RootState) => state.authentication.lastName;
export const selectUserTermsAndConditionsAcceptance = (state: RootState) => state.authentication.termsAndConditionsApproved;
export const selectUserCartId = (state: RootState) => state.authentication.cartId;

export default authenticationSlice.reducer;
