import React from 'react'
import Navbar from '../Navbar'
import styles from '../../../styles/home.module.css'

import { Box, Container } from '@mui/material'



function HomeAfterSignIn() {
  return (
   <>
   <Navbar/>
   <Container className='homeContainer'>
    <Box className="main-box"/>

  

   </Container>
  
   

   </>
  )
}

export default HomeAfterSignIn
