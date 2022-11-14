import React from 'react';
import { useAppSelector} from '../../app/store/hooks'
import {
  selectUserCartId,
} from '../../features/authentication/authenticationSlice'
import {useGetCartQuery} from '../../features/cart/cartAPI/cartAPI'
import {CartCard} from '../../theme/custom-components/CartCard'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {Link as RouterLink} from 'react-router-dom'
import {Link} from '@mui/material'
import {ROUTES} from '../../app/constants'

const BeginCheckoutContainer = () => {
  const cartId = useAppSelector(selectUserCartId)
  const {data: cartCache, error, isLoading, isSuccess, isError} = useGetCartQuery(cartId);


  return (
    <CartCard sx={{margin:{xs:'12px',md:'0'}, paddingX: '12px', paddingY: '14px'}}>
      <Box sx={{display: 'flex', flexDirection: 'column'}}>
        <Link component={RouterLink} style={{textDecoration: 'none'}} to={ROUTES.checkout.userInformation} sx={{alignSelf: 'center',}}>
          <Button disableElevation variant='contained' sx={{color:'white', fontWeight:'500'}} color="secondary">
            Begin Checkout
          </Button>
        </Link>
      </Box>
    </CartCard>
  )
};

export default BeginCheckoutContainer;