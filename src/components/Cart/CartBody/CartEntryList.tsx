import React, {FC} from 'react';
import Box from '@mui/material/Box'
import CartItem from './CartItem'
import {CartEntry} from '../../../features/cart/models/CartEntry'

const CartEntryList: FC<CartEntryListProps> = ({cartEntries,disableInteractions = false}) => {
  return (
    <Box sx={{display: 'flex-column'}}>
      {cartEntries.map((cartEntry) =>
        <Box key={cartEntry.cartEntryId} marginTop={2.3}>
          <CartItem cartEntry={cartEntry} disableInteractions={disableInteractions}></CartItem>
        </Box>
      )}
    </Box>
  );
};

interface CartEntryListProps {
  cartEntries: Array<CartEntry>;
  disableInteractions?: boolean
}

export default CartEntryList;