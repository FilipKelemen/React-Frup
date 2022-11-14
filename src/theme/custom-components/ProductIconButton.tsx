import { styled } from '@mui/material/styles';
import IconButton, {IconButtonProps} from '@mui/material/IconButton'

export const ProductIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  color: theme.palette.text.secondary
}));

