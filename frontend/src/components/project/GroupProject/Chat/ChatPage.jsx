import React from 'react'
import GroupSideBar from '../GroupSideBar'
import { Box,Grid } from '@mui/material'
import ChatUI from './ChatUI'
function ChatPage() {
  
  return (
    <>
          <Box display="flex">
      <GroupSideBar/>
      <Box flex="1" ml={3}>
        <Grid container>
          <Grid item xs={12}>
   <ChatUI/>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  )
}

export default ChatPage
