import React from 'react';
import {CssBaseline} from '@mui/material'
import Navbar from './components/Navbar/Navbar'
import {Navigate, Route, Routes} from 'react-router-dom'
import {useMyGoogleAuthentication} from './app/authentication/hooks/useMyGoogleAuthentication'
import {ROUTES} from './app/constants'
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductsListPage = React.lazy(() => import('./pages/ProductsListPage'));
const CartPage = React.lazy(() => import('./pages/CartPage'));
const ContactInformation = React.lazy(() => import('./pages/Checkout/UserInformation'));

function App() {
  useMyGoogleAuthentication();
  return (
      <React.Fragment>
        <CssBaseline />
        <Navbar></Navbar>
          <Routes>
            <Route index element={
              <React.Suspense fallback={<>...</>}>
                <HomePage/>
              </React.Suspense>
            }/>
            <Route path='/products' element={
              <React.Suspense fallback={<>...</>}>
                <ProductsListPage/>
              </React.Suspense>
            }/>
            <Route path='/cart' element={
              <React.Suspense fallback={<>...</>}>
                <CartPage/>
              </React.Suspense>
            }/>
            <Route path={ROUTES.checkout.userInformation} element={
              <React.Suspense fallback={<>...</>}>
                <ContactInformation/>
              </React.Suspense>
            }/>
            <Route path={ROUTES.checkout.self} element={<Navigate to={ROUTES.checkout.userInformation} replace />}/>
          </Routes>
      </React.Fragment>
  );
}

export default App;
