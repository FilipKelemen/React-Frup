import React from 'react';
import {SvgIcon, SvgIconProps} from '@mui/material'
import {ReactComponent as LogoSVG} from '../../assets/brand/logo.svg'

const LogoIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <LogoSVG/>
    </SvgIcon>
  );
};

export default LogoIcon;