export interface AuthenticationState extends  UserData{
  isLoggedIn: boolean;
}

export interface UserData {
  jwtToken: string;
  email: string;
  lastName: string;
  firstName: string;
  picture: string;
  cartId: string;
  termsAndConditionsApproved: boolean;
}