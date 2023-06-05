import React, {FC, useMemo, useState} from 'react';
import {DELETE_BUTTON_STYLES, DELETE_ICON_STYLES} from '../../../theme/constants/cartButtonsSpacing'
import {Delete} from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import Backdrop from '@mui/material/Backdrop'
import {CartCard} from '../../../theme/custom-components/CartCard'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import {CartEntry} from '../../../features/cart/models/CartEntry'
import CartItem from './CartItem'
import {useDeleteCartEntryMutation} from '../../../features/cart/cartAPI/cartAPI'
import {selectUserCartId} from '../../../features/authentication/authenticationSlice'
import {useAppSelector} from '../../../app/store/hooks'
import {operateWithPixels} from '../../../utils/stringManipulations'
import {OperationCallbacks} from '../../../utils/models/stringManipulation'

const CONSISTENT_SPACING_1 = { xs: '10px',sm:'13px',md:'18px',lg: '18px' }
const CONSISTENT_SPACING_2 = { xs: '16px',sm:'18px',md:'22px',lg:'24px' }

const PADDING_BOTTOM: typeof CONSISTENT_SPACING_2 = { xs: '0',sm:'0',md:'0',lg:'0' };
(Object.keys(CONSISTENT_SPACING_2) as Array<keyof typeof CONSISTENT_SPACING_2>)
  .forEach((key)  => {
    PADDING_BOTTOM[key] = operateWithPixels(CONSISTENT_SPACING_2[key],'2px',OperationCallbacks.subtract)
  });

const TITLE_FONT_SIZES = { xs: '1.09rem', sm: '1.2rem', lg: '1.2rem' }
const BUTTON_FONT_SIZES = { xs: '0.85rem', sm: '0.9rem', lg: '1rem' }
const BUTTON_STYLES = { paddingY: `3px`, paddingX: CONSISTENT_SPACING_1 }

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'min(95vw,500px)',
  paddingX: CONSISTENT_SPACING_2,
  paddingTop: CONSISTENT_SPACING_1,
  paddingBottom: PADDING_BOTTOM
};

const DeleteButton: FC<{cartEntry: CartEntry}> = ({cartEntry}) => {
  const [open,setOpen] = useState(false)
  //damn react
  const handleClose = useMemo(() => () => setOpen(false),[])
  const handleOpen = useMemo(() => () => setOpen(true),[])
  return (
    <React.Fragment>
      <IconButton sx={DELETE_BUTTON_STYLES} onClick={handleOpen}>
        <Delete sx={DELETE_ICON_STYLES}/>
      </IconButton>
      <MyModal open={open} handleClose={handleClose} cartEntry={cartEntry}/>
    </React.Fragment>
  );
};

export const MyModal:FC<{ open: boolean, handleClose: () => void, cartEntry: CartEntry }> = ({ open, handleClose, cartEntry }) => {
  return (
    <Modal aria-labelledby="transition-modal-title" aria-describedby="transition-modal-description"
                open={open} onClose={handleClose} closeAfterTransition
                BackdropComponent={Backdrop} BackdropProps={{timeout: 300}}>
      <ModalContent cartEntry={cartEntry} handleClose={handleClose}/>
    </Modal>
  )

}

const ModalContent = React.forwardRef((props: { cartEntry: CartEntry, handleClose: () => void },ref) => {
  const [deleteCartEntryFromCart] = useDeleteCartEntryMutation()
  const cartId = useAppSelector(selectUserCartId)
  const handleDeleteCartEntry = useMemo(() => () =>
    deleteCartEntryFromCart({cartId, cartEntryId: props.cartEntry.cartEntryId})
  ,[])
  return (
    <CartCard sx={modalStyle}>
      <Typography id="transition-modal-title" fontSize={TITLE_FONT_SIZES} component="h6" marginBottom={CONSISTENT_SPACING_1}>
        Are you sure you want to remove this item?
      </Typography>
      <CartItem cartEntry={props.cartEntry} disableInteractions/>
      <Box sx={{display: 'flex', justifyContent: 'center', marginTop: CONSISTENT_SPACING_1}}>
        <Button variant="text" sx={{color: 'text.secondary',...BUTTON_STYLES, fontSize: BUTTON_FONT_SIZES, marginRight:CONSISTENT_SPACING_2}} onClick={props.handleClose}>Cancel</Button>
        <Button variant="outlined" sx={{color: 'primary.main',...BUTTON_STYLES, fontSize: BUTTON_FONT_SIZES}} onClick={handleDeleteCartEntry}>Remove</Button>
        </Box>
    </CartCard>
  )
})
export default React.memo(DeleteButton);

