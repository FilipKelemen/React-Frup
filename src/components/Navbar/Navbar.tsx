import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {useState} from 'react'
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import {Link} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom';
import _uniqueId from 'lodash/uniqueId';
import {useAppSelector} from '../../app/store/hooks'
import {selectAuthenticationData} from '../../features/authentication/authenticationSlice'
import {NavbarAvatarMenu} from './NavbarAvatarMenu'
import LogoIcon from '../Logo/LogoIcon'
import LogoText from '../Logo/LogoText'

//I need the ids for the list keys
const pages = [{idForMobile: _uniqueId(),idForDesktop: _uniqueId(), name: 'Products'}];

const Navbar = () => {
    const userData = useAppSelector(selectAuthenticationData);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link component={RouterLink} sx={{
                textDecoration: 'none', color: 'inherit', display: 'flex',
                justifyContent: 'center', alignItems: 'center'
              }} to={'/'}>
                <LogoIcon sx={{fontSize: '3rem',display: {xs: 'none', md: 'flex'}}}/>
                <LogoText sx={{fontSize:'6rem', height: '3.5rem', marginLeft: '-0.7rem', display: {xs: 'none', md: 'flex'}}}/>
              </Link>
              <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                <IconButton
                  sx={{color: 'white'}}
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}>
                  <MenuIcon/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{display: {xs: 'block', md: 'none'},}}>
                  {pages.map((page) => (
                    <Link key={page.idForMobile} component={RouterLink} sx={{textDecoration: 'none'}}
                          to={`/${page.name}`.toLowerCase()}>
                      <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.name}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                </Menu>
              </Box>
              <Link component={RouterLink} sx={{
                textDecoration: 'none', display: {xs: 'flex', md: 'none'}, color: 'inherit',
                alignItems: 'center', flexGrow: 1
              }} to={'/'}>
                <LogoIcon sx={{fontSize: '2.7rem',display: {xs: 'flex', md: 'none'}}}/>
                <LogoText sx={{fontSize:'4rem', height: '3rem', marginLeft: '-0.3rem', display: {xs: 'flex', md: 'none'}}}/>
              </Link>
              <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                {pages.map((page) => (
                  <Link key={page.idForDesktop} component={RouterLink} style={{textDecoration: 'none'}}
                        to={`/${page.name}`.toLowerCase()}>
                    <Button
                      onClick={handleCloseNavMenu}
                      variant='contained'
                      disableElevation
                      sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        fontWeight: 550,
                        fontSize: '0.9rem',
                        fontFamily: 'monospace'
                      }}>
                      {page.name}
                    </Button>
                  </Link>
                ))}
              </Box>
              <Box sx={{flexGrow: 0}}>
                <Link component={RouterLink} sx={{textDecoration: 'none'}} to={'/cart'}>
                  <IconButton
                    size="large"
                    aria-label="cart">
                    <ShoppingCartRoundedIcon sx={{color: "white"}}/>
                  </IconButton>
                </Link>
              </Box>
              <Box sx={{flexGrow: 0, display: {xs: 'none', md: 'flex'}}}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    <Avatar alt={userData.firstName} src={userData.picture}/>
                  </IconButton>
                </Tooltip>
                <NavbarAvatarMenu anchorEl={anchorElUser} onClose={handleCloseUserMenu} userData={userData}/>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
    );
};
export default Navbar;
