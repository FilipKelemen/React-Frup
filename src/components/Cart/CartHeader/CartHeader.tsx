import React, {FC} from 'react';
import LogoIcon from '../../Logo/LogoIcon'
import {Box} from '@mui/material'
import BrandNameAndNumberOfItems from './BrandNameAndNumberOfItems'
import Subtotal from './Subtotal'
import {Cart} from '../../../features/cart/models/CartCache'

const CartHeader: FC<{cart?: Cart}> = ({cart}) => {
  return (
    <Box sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
      <Box sx={{display: 'flex', alignItems: 'center'}}>
        <LogoIcon sx={{fontSize: '2.5rem', marginRight: '9px'}}/>
        <BrandNameAndNumberOfItems
          numberOfItems={cart?.cartEntries?.map((cartEntry) => cartEntry.quantity).reduce(
            (previousValue, currentValue) => previousValue + currentValue, 0)}/>
      </Box>
      <Subtotal cart={cart}/>
    </Box>
  );
};

export default CartHeader;