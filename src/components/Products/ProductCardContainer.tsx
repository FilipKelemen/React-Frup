import {CardActions, CardContent, CardMedia} from '@mui/material'
import React from 'react'
import {Product} from '../../features/products/models/ProductsCache'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import {ProductIconButton} from '../../theme/custom-components/ProductIconButton'
import {ProductCard} from '../../theme/custom-components/ProductCard'
import {useAppSelector} from '../../app/store/hooks'
import {selectUserCartId} from '../../features/authentication/authenticationSlice'
import {usePostCartEntryMutation} from '../../features/cart/cartAPI/cartAPI'
const iconsFontStyles = {fontSize: {xs:'7.5vw', sm:'4.5vw', md:'3.5vw', xl:'2.4vw'}}

export const ProductCardContainer = ({product} : {product: Product}) => {
  const cartId = useAppSelector(selectUserCartId)
  const [postCartEntryToCart] = usePostCartEntryMutation()
  const addProductToCart = (cartIdOfFutureEntry: string,productOfFutureEntry: Product,quantity: number) => {
    if(!cartIdOfFutureEntry) {
      throw new Error('No cart in front end yet')
    }
    postCartEntryToCart({cartId, product: productOfFutureEntry, quantity})
  }
  return (
    <ProductCard sx={{height: '100%',aspectRatio: '5/9'}}>
      <CardMedia
        component="img"
        height="70%"
        image={product.imageUrl}
        alt={`Image of a ${product.name}`}/>
      <CardContent sx={{height:'30%', position: 'relative'}}>
        <CardActions sx={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Container sx={{width: '100%', height:'100%', display: 'flex', alignItems:'center', justifyContent: 'space-around'}}>
            <ProductIconButton>
              <FavoriteSharpIcon sx={iconsFontStyles}/>
            </ProductIconButton>
            <ProductIconButton onClick={() => addProductToCart(cartId,product,1)}>
              <ShoppingCartRoundedIcon sx={iconsFontStyles}/>
            </ProductIconButton>
          </Container>
        </CardActions>
        <Tooltip title='Product Description'>
          <Box sx={{borderRadius: '50%', position: 'absolute', height: '13%', aspectRatio: '1/1', backgroundColor: 'success.main', right:'10%', bottom:'15%'}}></Box>
        </Tooltip>
      </CardContent>
   </ProductCard>
  )
}