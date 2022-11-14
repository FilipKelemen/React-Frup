import React from 'react';
import Container from '@mui/material/Container'
import CartContainer from '../components/Cart/CartContainer'
import {Grid} from '@mui/material'
import BeginCheckoutContainer from '../components/Checkout/BeginCheckoutContainer'


const CartPage = () => {
    return (
      <Container maxWidth="xl" sx={{marginTop: '5vh'}}>
        <Grid container spacing={{xs:0,  sm: 1, md: 3, lg: 4}}>
          <Grid item xs={12} sm={8}>
            <CartContainer/>
          </Grid>
          <Grid item xs={12} sm={4} >
            <BeginCheckoutContainer/>
          </Grid>
        </Grid>
      </Container>
    );
};

export default CartPage;