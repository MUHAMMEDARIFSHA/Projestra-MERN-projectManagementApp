import React from 'react'
import MemberSidebar from './MemberSidebar'
import { Box,Grid } from '@mui/material'

function MemberCompleted() {
  return (
    <div>
          <Box display="flex">
       <MemberSidebar/>
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>
              <Grid item alignContent="center" xs={11}>
              <h1>member completed</h1>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  )
}

export default MemberCompleted

