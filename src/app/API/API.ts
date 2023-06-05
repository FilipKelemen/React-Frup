import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from '../store/store'
const PROTECTED_ENDPOINTS = ['getCart','getCartOfUser','postCartEntry','updateCartEntry','deleteCartEntry','updateAddress']

export const API = createApi({
  reducerPath: "API",
  tagTypes: ['UserTag','CartTag'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/fruits",
    prepareHeaders: (headers, {endpoint,getState}) => {
      headers.set('Content-Type', 'application/json')
      const accessToken = (getState() as RootState).authentication.jwtToken;
      if(accessToken!=='' && PROTECTED_ENDPOINTS.includes(endpoint)) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }
      return headers;
    }
  }),
  endpoints: () => ({
  }),
})

export const  {  } = API;