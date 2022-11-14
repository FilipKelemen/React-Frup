import { styled } from '@mui/material/styles';
import IconButton, {IconButtonProps} from '@mui/material/IconButton'
const NEUROMORPHSM_BOX_SHADOW = '0px 0px 4px 1px rgba(145,145,145,0.36)'

export const NeuromorphicButton = styled(IconButton)<IconButtonProps>(() => ({
  boxShadow: NEUROMORPHSM_BOX_SHADOW
}));

