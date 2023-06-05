import Button, {ButtonProps} from '@mui/material/Button'
import React, {FC, ReactElement, ReactNode} from 'react'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import {CircularProgress} from '@mui/material'
import Box from '@mui/material/Box'

export const LoadingButton:FC<{children: ReactNode | ReactElement,buttonProps: ButtonProps,loading: boolean,done: boolean}> = ({ loading,children,buttonProps,done }) => {
  if (done) {
    return (
      <Button {...buttonProps} disabled>
        <Box sx={{visibility: 'hidden'}}>
          {children}
        </Box>
        <CheckCircleRoundedIcon  sx={{
          transition: 'opacity 1s',
          color: 'success.main',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
          animation: 'opacityChange 150ms ease-in',
          '@keyframes opacityChange': {
            '0%': {
              opacity: '0'
            },
            '100%': {
              opacity: '1'
            }
          }
        }}/>
      </Button>
    );
  }
  if (loading) {
    return (
      <Box sx={{position: 'relative', display: 'inline-block'}}>
        <Button  sx={{minWidth: 0}} {...buttonProps} disabled>
          <Box sx={{visibility: 'hidden'}}>
            {children}
          </Box>
        </Button>
        <CircularProgress size={24} sx={{
          color: 'success.main',
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-12px',
          marginLeft: '-12px',
        }}/>
      </Box>
  )
  }
  return (
    <Button {...buttonProps}>
      {children}
    </Button>
  );
};
