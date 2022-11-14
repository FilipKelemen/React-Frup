import { styled } from '@mui/material/styles';
import {Card, CardProps} from '@mui/material'

export const ProductCard = styled(Card)<CardProps>(() => ({
  borderRadius: 15,
  boxShadow: '0px 0px 2px 0px #666666',
  transition: 'box-shadow 0.20s',
  cursor: 'pointer',
  '&:hover' : {
    boxShadow: '0px 0px 6px 0px #666666',
  },
  '& .MuiCardContent-root': {
        padding: 0,
        '&:last-child': {
          padding: 0
        }
  }
}));
