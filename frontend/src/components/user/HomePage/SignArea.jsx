import React from 'react'
import { Box,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
function SignArea() {
  const navigate = useNavigate()
  const toSignIn = ()=>{
  navigate('/signin')
  }

  const toSignUp = ()=>{
    navigate('/signup')
  }


  return (
    <>
      
      <Box sx={{ m: 0, p: 0 }}>
            <Button
            onClick={toSignIn}
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
            onClick={toSignUp}
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
