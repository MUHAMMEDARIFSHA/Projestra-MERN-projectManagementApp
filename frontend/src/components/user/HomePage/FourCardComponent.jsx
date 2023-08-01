import React from 'react'
import { Box,Container,Grid,Card,Typography,Divider,IconButton } from '@mui/material'

import ArticleIcon from "@mui/icons-material/Article";


function FourCardComponent() {
  return (
    <>
       <Container>
        <Grid container justifyContent={"flex-start"} spacing={2} sx={{ mt: 10 ,mb:6}}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%" }}>
              <Grid  sx={{ background: "#FF7452", maxHeight: "50px",display: "flex", justifyContent: "flex-start" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box textAlign="start" sx={{minHeight:"180px"}}>
                <Typography color='#1C4B9B' variant="h6" sx={{ m: 2, ml: 1, mb: 1, fontWeight: 600 }}>
                  Project management
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
                
                    fontSize: "16px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Keep tasks in order, deadlines on track,
                  and team members aligned With Projestra
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%" }}>
              <Grid sx={{ background: "#2684FF", maxHeight: "50px",display: "flex", justifyContent: "flex-start" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box  textAlign="start" sx={{minHeight:"181px"}} >
                <Typography color='#1C4B9B' variant="h6" sx={{ m: 2, ml: 1, mb: 1, fontWeight: 600 }}>
                  Meetings
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
            
                    fontSize: "16px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Empower your team meetings to be
                  more productive, empowering, and
                  dare we say—fun.
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%" }}>
              <Grid sx={{ background: "#FFC400", maxHeight: "50px",display: "flex", justifyContent: "flex-start" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box  textAlign="start" sx={{minHeight:"180px"}} >
                <Typography color='#1C4B9B' variant="h6" sx={{ m: 2, ml: 1, mb: 1, fontWeight:600 }}>
                  Task Management
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
                    
            fontSize: "16px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Use Projestro to track, manage, complete,
                  and bring together like the pieces
                  of a puzzle, and make your team's
                  projects a cohesive success every time.
                </Typography>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ width: "100%" }}>
              <Grid sx={{ background: "#57D9A3", maxHeight: "50px",display: "flex", justifyContent: "flex-start" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box  textAlign="start"sx={{minHeight:"181px"}} >
                <Typography color='#1C4B9B' variant="h6" sx={{ m: 2, ml: 1, mb: 1, fontWeight: 600 }}>
                  Onboarding
                </Typography>
                <Typography
                  sx={{
                    ml: 1,
               
 fontSize: "16px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Onboarding to a new company or
                  project is a snap with Projestros
                  visual layout of to-doe resources,
                  and progress tracking.
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>


    </>
  )
}

export default FourCardComponent
