import React from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import MyStepper from './MyStepper'

const UserInformation = () => {
  return (
    <Container maxWidth="xl" sx={{marginTop: '5vh'}}>
      {/* this margin is the same margin that s used for icon paddings, without this it looks wierd on mobile */}
      <Box sx={{margin:{xs:'12px'}}} >
        <MyStepper/>
      </Box>
    </Container>
  );
};

export default UserInformation;