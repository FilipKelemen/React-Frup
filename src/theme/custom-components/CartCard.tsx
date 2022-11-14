import { styled } from '@mui/material/styles';
import {Card, CardProps} from '@mui/material'

export const CartCard = styled(Card)<CardProps>(({ theme }) => ({
  borderRadius: 10,
  boxShadow: '0px 0px 2px 0px #666666',
}));
