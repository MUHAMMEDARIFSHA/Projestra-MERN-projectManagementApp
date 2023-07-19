import React from 'react'
import GroupSideBar from './GroupSideBar'
import { Box,Grid } from '@mui/material'

function OngoingTasks() {
  return (
    <div>
      <Box display="flex">
      <GroupSideBar/>
      <Box flex="1" ml={3}>
        <Grid container>
          <Grid item xs={12}>
    <h1>on going</h1>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
  )
}

export default OngoingTasks
