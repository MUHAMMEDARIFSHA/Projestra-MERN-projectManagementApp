import React from 'react'
import GroupSideBar from './GroupSideBar'
import { Typography ,Box,Grid} from '@mui/material'

function GroupProject() {
  return (
    <>
       <Box display="flex">
      <GroupSideBar/>
      <Box flex="1" ml={3}>
        <Grid container>
          <Grid item xs={12}>
         
          </Grid>
        </Grid>
      </Box>
    </Box>
    </>
  )
}

export default GroupProject
