import React from 'react';
import Container from '@mui/material/Container'
import MyStepper from '../components/Checkout/AddressForm/MyStepper'
import CartContainer from '../components/Cart/CartContainer'
import {Grid} from '@mui/material'

const UserInformation = () => {
  return (
    <Container maxWidth="xl" sx={{marginTop: '5vh'}}>
      <Grid container  sx={{marginTop:{xs:'12px'}, paddingLeft:'12px'}} justifyContent={'space-between'}>
        <Grid item xs={7}>
          <MyStepper/>
        </Grid>
        <Grid item xs={4}>
          <CartContainer disableInteractions/>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserInformation;