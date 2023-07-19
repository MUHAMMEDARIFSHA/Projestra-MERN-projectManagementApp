import React from 'react'
import GroupSideBar from './GroupSideBar'
 import { Box,Grid } from '@mui/material'
function ProjectsTasks() {
  return (
    <div>
       <Box display="flex">
      <GroupSideBar/>
      <Box flex="1" ml={3}>
        <Grid container>
          <Grid item xs={12}>
    <h1>tasks</h1>
    
          </Grid>
        </Grid>
      </Box>
    </Box>
    </div>
  )
}

export default ProjectsTasks
