import React, {FC} from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import {Cart} from '../../../features/cart/models/CartCache'
import {formatPrice, getFormattedPriceOfCart} from '../../../utils/cart'
const Subtotal: FC<{cart?: Cart}> = ({cart}) => {
  return (
    <Box sx={{display: 'flex-column'}}>
      <Typography fontWeight='700' color='text.primary' letterSpacing='0.01px' textAlign='end'>
        {cart ? getFormattedPriceOfCart(cart) : formatPrice(0,"$")}
      </Typography>
      <Typography fontSize='0.8rem' color='text.secondary' textAlign='end'>
        Subtotal
      </Typography>
    </Box>
  );
};

export default Subtotal;