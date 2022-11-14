import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import _uniqueId from 'lodash/uniqueId'
import {GOOGLE_SIGN_IN_ELEMENT_ID} from '../../app/authentication/constants'
import {handleLogOut} from '../../app/authentication/utils/handleLogOut'
import {AuthenticationState} from '../../features/authentication/models/AuthenticationState'
const settings = [
  {props:{key: _uniqueId()}, name:'Profile', alwaysRender: true},
  {props:{key: _uniqueId()}, name:'Account', alwaysRender: true},
  {props:{key: _uniqueId(), id: GOOGLE_SIGN_IN_ELEMENT_ID},name:'Login', alwaysRender: false},
  {props:{key: _uniqueId(), onClick: handleLogOut}, name:'Logout', alwaysRender: false}
];

export const NavbarAvatarMenu =(props: { anchorEl: HTMLElement | null, onClose: () => void, userData: AuthenticationState}) => {
  return <Menu sx={{mt: '45px'}}
               id="menu-appbar"
               anchorEl={props.anchorEl}
               anchorOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               keepMounted
               transformOrigin={{
                 vertical: 'top',
                 horizontal: 'right',
               }}
               open={Boolean(props.anchorEl)}
               onClose={props.onClose}>
    {settings.map((setting) => (setting.alwaysRender)
      ? (<MenuItem {...setting.props}>
          <Typography textAlign="center">{setting.name}</Typography>
        </MenuItem>)
      : ''
    )}
    {(props.userData.isLoggedIn) &&
        <MenuItem {...settings.find((setting: any) => setting.name==='Logout')!.props}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>}
    <MenuItem {...settings.find((setting: any) => setting.name==='Login')!.props}
              sx={(props.userData.isLoggedIn) ? {display: 'none'}: {display:'block'}}>
    </MenuItem>
  </Menu>
}
