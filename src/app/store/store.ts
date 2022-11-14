import { configureStore, } from '@reduxjs/toolkit';
import authenticationReducer from '../../features/authentication/authenticationSlice';
import {API} from '../API/API'
import {setupListeners} from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [API.reducerPath]: API.reducer,
    authentication: authenticationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(API.middleware)
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;