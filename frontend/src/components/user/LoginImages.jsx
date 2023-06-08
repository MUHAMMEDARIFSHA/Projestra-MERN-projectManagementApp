import React from 'react'
import { Box } from '@mui/material'

function LoginImages() {
  return (
    <div>
      <Box
        component="img"
        sx={{
          height: 250,
          width: 400,
          position: "absolute",
          bottom: 0,
          left: 0,
          opacity:0.8,
           display: { xs: "none", sm: "block" } 
        }}
        alt="The house from the offer."
        src="/images/login image 3.png"
      />
      <Box
        component="img"
        sx={{
          height: 250,
          width: 400,
          position: "absolute",
          bottom: 0,
          right: 0,
          display: { xs: "none", sm: "block" } 
        }}
        alt="The house from the offer."
        src="/images/login image 2.png"
      />

    </div>
  )
}

export default LoginImages
