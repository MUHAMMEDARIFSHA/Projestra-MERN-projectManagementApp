import React from 'react'
import { Box,Button } from '@mui/material'
function SignArea() {
  return (
    <>
      
      <Box sx={{ m: 0, p: 0 }}>
            <Button
                fullWidth
              sx={{
                  height: "50px",
                  minWidth:"120px",
                  fontWeight: "700",
                  fontSize:"20px",
                  backgroundColor: "white",
                  borderRadius:0
                  
                }}
              >
                SignIn
              </Button>
            </Box>
            <Box sx={{ m: 0, p: 0 }}>
            <Button
                fullWidth
                variant="contained"
                sx={{
                  height: "45px",
                  borderRadius:"0",
                  minWidth:"120px",
                  fontWeight: "700",
                  fontSize:"20px",
                  backgroundColor: "#0065FF",
                }}
              >
                SignUp
              </Button>
            </Box>
    </>
  )
}

export default SignArea
