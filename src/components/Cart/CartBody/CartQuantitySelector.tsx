import React, {FC, useRef} from 'react';
import {Add, Remove} from '@mui/icons-material'
import Box from '@mui/material/Box'
import {Input} from '@mui/material'
import {NeuromorphicButton} from '../../../theme/custom-components/NeuromorphicButton'
import {QUANTITY_BUTTONS_STYLES} from '../../../theme/constants/cartButtonsSpacing'
import {useUpdateCartEntryMutation} from '../../../features/cart/cartAPI/cartAPI'
import {useAppSelector} from '../../../app/store/hooks'
import {selectUserCartId} from '../../../features/authentication/authenticationSlice'
import {CartEntry} from '../../../features/cart/models/CartEntry'
import {throttle} from '../../../utils/throttle'

const INPUT_STYLES = {width: '12px', marginX:{xs: '5px', md:'6px', lg: '8px'}}

const CartQuantitySelector: FC<{cartEntry: CartEntry,disableInteractions?: boolean}> = ({cartEntry,disableInteractions = false}) => {
  const cartId = useAppSelector(selectUserCartId)
  const [patchCartEntryToCart] = useUpdateCartEntryMutation()
  //todo make the component not render 3 times, throttle is responsible
  const throttledEntryUpdater = useRef(
    throttle(
      (localCartId: string, cartEntryId: string, quantity: number) => {
        patchCartEntryToCart({cartId: localCartId, cartEntryId, quantity})
      },300
    )
  ).current
  return (
    <Box>
      {!disableInteractions ?
        <NeuromorphicButton sx={QUANTITY_BUTTONS_STYLES}
                            disabled={cartEntry.quantity <= 1}
                            onClick={() => throttledEntryUpdater(cartId,cartEntry.cartEntryId,cartEntry.quantity + -1)}>
          <Remove/>
        </NeuromorphicButton> : ''
      }
      {!disableInteractions ?
        <Input disableUnderline={true} sx={INPUT_STYLES} value={cartEntry.quantity} inputProps={{ 'aria-label': 'description' }}/> : ''
      }
      {!disableInteractions ?
        <NeuromorphicButton sx={QUANTITY_BUTTONS_STYLES}
                            disabled={cartEntry.quantity >= cartEntry.product.numberInStock}
                            onClick={() => throttledEntryUpdater(cartId,cartEntry.cartEntryId,cartEntry.quantity + 1)}>
          <Add/>
        </NeuromorphicButton> : ''
      }
    </Box>
  );
};

export default CartQuantitySelector;