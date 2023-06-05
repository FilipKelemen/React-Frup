import React, {FC} from 'react';
import {Card, CardMedia, Grid} from '@mui/material'
import {CartEntry} from '../../../features/cart/models/CartEntry'
import Typography from '@mui/material/Typography'
import {turnFirstLetterToUppercaseAndTheRestLowercase} from '../../../utils/stringManipulations'
import CartQuantitySelector from './CartQuantitySelector'

import {getFormattedPriceOfCartEntry} from '../../../utils/cart'
import DeleteButton from './DeleteButton'
import {PRODUCT_TITLE_FONT_SIZES} from '../../../theme/constants/fonts'
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box'

const SMALL_LETTER_SPACING = '-0.4px'

const PRICE_FONT_SIZES = { xs: '0.9rem', sm: '0.95rem',md: '0.91rem',  lg: '0.95rem' }
const CATEGORY_FONT_SIZES = { xs: '0.8rem', sm: '0.9rem',md: '0.85rem', lg: '0.93rem' }


const CartItem: FC<{cartEntry: CartEntry,disableInteractions?: boolean}> = ({cartEntry,  disableInteractions= false}) => {
  return (
    <Grid container >
      <Grid item xs={3} sm={2.5} md={1.5}>
        <Card sx={{ aspectRatio: '7.5/10', boxShadow: 'none' }}>
          <CardMedia
            component='img'
            image={cartEntry.product.imageUrl}
            alt={cartEntry.product.name}
            sx={{aspectRatio: '7.5/10'}}/>
        </Card>
      </Grid>
      <Grid item xs={9} sm={9.5} md={10.5}>
        <Grid container paddingLeft={2} direction={"column"} justifyContent={"space-between"} height={'100%'}>
          <Grid container item justifyContent={'space-between'}>
            <Grid item>
              <Typography letterSpacing={SMALL_LETTER_SPACING} fontWeight='600' lineHeight={'100%'} paddingBottom={'3.5%'} fontSize={PRODUCT_TITLE_FONT_SIZES} color='text.primary'>
                {turnFirstLetterToUppercaseAndTheRestLowercase(cartEntry.product.name)}
              </Typography>
              <Typography letterSpacing={SMALL_LETTER_SPACING} fontWeight='500' fontSize={PRICE_FONT_SIZES} color='text.primary'>
                {getFormattedPriceOfCartEntry(cartEntry)}
              </Typography>
            </Grid>
            <Grid item >
              {!disableInteractions
                ? <DeleteButton cartEntry={cartEntry}/>
                : <Box display={'flex'} alignItems={'center'} justifyContent={'center'} >
                    <ClearIcon sx={{fontSize: PRODUCT_TITLE_FONT_SIZES}}/>
                    <Typography variant={'h6'} fontWeight='500' fontSize={PRODUCT_TITLE_FONT_SIZES} lineHeight={'100%'}>
                      {cartEntry.quantity}</Typography>
                  </Box>
              }
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justifyContent={'space-between'}>
              <Grid item alignSelf={'end'}>
                <Grid container>
                  <Grid item>
                    <Typography letterSpacing={SMALL_LETTER_SPACING} fontWeight='600' fontSize={CATEGORY_FONT_SIZES} color='text.primary'>
                      Color:
                    </Typography>
                  </Grid>
                  <Grid item marginLeft={'4px'}>
                    <Typography letterSpacing={SMALL_LETTER_SPACING} fontWeight='500' fontSize={CATEGORY_FONT_SIZES} color='text.primary'>
                      {turnFirstLetterToUppercaseAndTheRestLowercase(cartEntry.product.colors[0].name)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <CartQuantitySelector cartEntry={cartEntry} disableInteractions={disableInteractions}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
)
}

export default React.memo(CartItem);

