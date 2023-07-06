import React from 'react'
import ProjectSidebar from './ProjectSidebar'
import ProjectDashboard from './ProjecDashboard'
import { BarChart, BarChart3 } from 'lucide-react'
import { Typography ,Box,Grid} from '@mui/material'

function IndivitualProject() {
  return (
    <>
    <Box display="flex">
      <ProjectSidebar/>
      <Box flex="1" ml={3}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">This is the project page</Typography>
            <ProjectDashboard/>
          </Grid>
        </Grid>
      </Box>
    </Box>
       
    </>
  )
}

export default IndivitualProject
