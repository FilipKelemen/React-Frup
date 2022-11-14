import React from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material'
import {ReactComponent as LogoTextSVG} from '../../assets/brand/logo-text.svg'

const LogoText = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} inheritViewBox>
      <LogoTextSVG/>
    </SvgIcon>
  );
};

export default LogoText;