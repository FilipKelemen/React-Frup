import React, {FC} from 'react';
import Box from '@mui/material/Box'
import CartItem from './CartItem'
import {CartEntry} from '../../../features/cart/models/CartEntry'

const CartEntryList: FC<{cartEntries: Array<CartEntry>}> = ({cartEntries}) => {
  return (
    <Box sx={{display: 'flex-column'}}>
      {cartEntries.map((cartEntry) =>
        <CartItem key={cartEntry.cartEntryId} cartEntry={cartEntry}></CartItem>
      )}
    </Box>
  );
};

export default CartEntryList;