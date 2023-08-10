import { Button } from '@mui/material'
import React ,{useEffect}from 'react'
import { useNavigate } from 'react-router-dom'

function StripePage() {
    const navigate = useNavigate()
   
  return (
    <>
    <Button 
      >
        Payment
      </Button>
    
    </>
  )
}

export default StripePage
