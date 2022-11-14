import React from 'react';
import {CartCard} from '../../theme/custom-components/CartCard'
import CartHeader from './CartHeader/CartHeader'
import {useGetCartQuery} from '../../features/cart/cartAPI/cartAPI'
import {selectUserCartId} from '../../features/authentication/authenticationSlice'
import {useAppSelector} from '../../app/store/hooks'
import CartEntryList from './CartBody/CartEntryList'

const CartContainer = () => {
  const cartId = useAppSelector(selectUserCartId)
  const {data: cartCache, isSuccess} = useGetCartQuery(cartId);
  return (
    //this margin is the same margin that s used for icon paddings, without this it looks wierd on mobile
    <CartCard sx={{margin:{xs:'12px',md:'0'}, paddingX: '12px', paddingY: '14px'}}>
      <CartHeader cart={(isSuccess && cartCache) ? cartCache.cart : undefined}/>
      {
        (isSuccess && cartCache && cartCache.cart.cartEntries.length !== 0) ? <CartEntryList cartEntries={cartCache.cart.cartEntries}/> : <div>No items in cart</div>
      }
    </CartCard>
  );
};

export default CartContainer;