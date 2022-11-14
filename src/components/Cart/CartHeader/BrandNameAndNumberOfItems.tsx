import React, {FC} from 'react';
import Typography from '@mui/material/Typography'
import {BRAND_NAME} from '../../../app/constants'
import Box from '@mui/material/Box'

const BrandNameAndNumberOfItems: FC<{numberOfItems?: number}> = ({numberOfItems}) => {
  return (
    <Box sx={{display: 'flex-column'}}>
      <Typography fontWeight='700' color='text.primary' letterSpacing='0.01px'>
        {BRAND_NAME}
      </Typography>
      <Typography fontSize='0.8rem' color='text.secondary'>
        {numberOfItems ?? '0'} items
      </Typography>
    </Box>
  );
};

export default BrandNameAndNumberOfItems;