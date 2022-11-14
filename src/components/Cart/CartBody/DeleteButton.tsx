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

const buttonStyle = {
  width: 'min(23%, 4vw)'
};

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'max(40vw,300px)',
  paddingX: 3.5,
  paddingTop: 2.5,
  paddingBottom: 2
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
      <Typography id="transition-modal-title" variant="h6" component="h6" marginBottom='4px'>
        Are you sure you want to remove this item?
      </Typography>
      <CartItem cartEntry={props.cartEntry} disableInteractions/>
      <Box sx={{display: 'flex', justifyContent: 'space-evenly', marginTop:'15px'}}>
        <Button variant="text" sx={{color: 'text.secondary', ...buttonStyle}} onClick={props.handleClose}>Cancel</Button>
        <Button variant="outlined" sx={{color: 'primary.main', ...buttonStyle}} onClick={handleDeleteCartEntry}>Remove</Button>
      </Box>
    </CartCard>
  )
})
export default React.memo(DeleteButton);

