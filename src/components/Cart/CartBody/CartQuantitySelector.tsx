import React, {FC, KeyboardEventHandler, useRef, useState} from 'react';
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

const INPUT_STYLES = {width: '20px', marginX:{xs: '5px', md:'6px', lg: '8px'}}

const CartQuantitySelector: FC<{cartEntry: CartEntry,disableInteractions?: boolean}> = ({cartEntry,disableInteractions = false}) => {
  const cartId = useAppSelector(selectUserCartId)
  const [patchCartEntryToCart] = useUpdateCartEntryMutation()
  const [isInputFocused,setIsInputFocused] = useState(false)
  //todo make the component not render 3 times, throttle is responsible
  const throttledEntryUpdater = useRef(
    throttle(
      (localCartId: string, cartEntryId: string, quantity: number) => {
        patchCartEntryToCart({cartId: localCartId, cartEntryId, quantity})
      },300
    )
  ).current
  const handleKeyPressed: React.KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
    if(event.key.match(/\p{L}+/u) && event.key.length === 1 && !event.key.includes('Arrow')) {
      event.preventDefault()
    }
    // @ts-ignore
    const currentValue = parseInt(event.target.value)
    if(event.key === 'Enter' && currentValue <= cartEntry.product.numberInStock && currentValue > 0 && currentValue !== cartEntry.quantity) {
      throttledEntryUpdater(cartId,cartEntry.cartEntryId,currentValue)
    }
  }
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      {!disableInteractions ?
        <NeuromorphicButton sx={QUANTITY_BUTTONS_STYLES}
                            disabled={cartEntry.quantity <= 1}
                            onClick={() => throttledEntryUpdater(cartId,cartEntry.cartEntryId,cartEntry.quantity + -1)}>
          <Remove/>
        </NeuromorphicButton> : ''
      }
      {!disableInteractions ?
        (!isInputFocused ?
            <Input key={cartEntry.cartEntryId + 'controlledInput'}
                   onFocus={() => setIsInputFocused((oldValue) => !oldValue)} disableUnderline={true} sx={INPUT_STYLES} value={cartEntry.quantity} inputProps={{ 'aria-label': 'description',style: { textAlign: 'center' } }}/>
            : <Input key={cartEntry.cartEntryId + 'uncontrolledInput'}
                     autoFocus
                     onBlur={() => setIsInputFocused((oldValue) => !oldValue)}
                     onKeyDown={handleKeyPressed} disableUnderline={true}
                     sx={INPUT_STYLES} defaultValue={cartEntry.quantity} inputProps={{ 'aria-label': 'description', style: { textAlign: 'center' } }}/>
        ): ''
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