import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "../Navbar";
import CustomCard from "../../customItems/CustomCard";
import BottomBar from "./BottomBar";
import FourCardComponent from "./FourCardComponent";
import TwoBoxComponent from "./TwoBoxComponent";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardContent,
  Divider,
  IconButton,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

function HomeAfterSignIn() {
  const navigate = useNavigate()
  const toProject = ()=>{
    navigate('/user/projects')
  }
  return (
    <>
      <Navbar />
      {/*  banner */}
      <Stack direction="column" marginTop="60px">
      <Box
      sx={{
        background: "linear-gradient(to right , #2684FF ,#79F2C0)",
     // Make the box at least the height of the viewport
        width: "100%",
        display: "flex",
        textAlign: "left",
      }}
    >
      <Container>
        <Grid container alignItems={"center"}>
          <Grid item xs={12} sm={6}>
            {/* Adjust the column size based on the screen size */}
            <Typography sx={{ color: "white", fontSize: "42px", mt: { xs: '50px', sm: '-170px' } }}>
              Let's start your project...!
            </Typography>
            <Typography sx={{ mt: 3, mb: 4, color: "white", fontSize: "38px" }}>
              Move Fast - Stay Together..!
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontSize: "20px", fontWeight: "500", mt: 4, mb: 4, color: "white" }}
            >
              Top trending software for project management.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <img
              src="/images/homepage-image2.png"
              alt="main-banner"
              style={{
                maxWidth: "100%", // Image will scale with its container
                height: "auto", // Image height will adjust accordingly
                paddingLeft: { xs: "0", sm: "65px" },
                paddingTop: { xs: "0", sm: "5px" },
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
      
        <Box
        
      sx={{
        background: "linear-gradient(to bottom, white, #B3D4FF)",
   // Set the minimum height to ensure content fills the viewport
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: '20px', // Add some padding to the container
        
      }}
    >
      <Container maxWidth="lg" > {/* Use maxWidth to limit the container width */}
        <Grid container justifyContent="center">
          <Typography
            variant="h2"
            sx={{ fontSize: "3rem", fontWeight: 550, marginBottom: 16 }}
          >
            Choose your project type...!
          </Typography>
        </Grid>
        <Grid container justifyContent="space-around"mb={5} spacing={2}>
          <Grid item xs={12} sm={6} md={4}> {/* Use responsive sizes for different screens */}
            <Card sx={{ width: "100%",height:250, cursor: 'pointer' }} onClick={toProject}>
              <Grid display='flex' justifyContent='start' sx={{ background: "#2684FF", maxHeight: "50px" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box sx={{ maxHeight: "400px" }}>
                <Typography  textAlign="left"
                  variant="h4"
                  sx={{ m: 3, ml: 1, mb: 1, fontWeight: 500 }}
                >
                  Individual projects
                </Typography>
                <Typography textAlign="left"
                  sx={{
                    ml: 1,
                    mb: 10,
                    fontSize: "20px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Manage your own projects,<br />
                  create and deploy your ideas.
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}> {/* Use responsive sizes for different screens */}
            <Card m sx={{ width: "100%", height:250, cursor: "pointer" }} onClick={toProject}>
              <Grid display='flex' justifyContent='start' sx={{ background: "#2684FF", maxHeight: "50px" }}>
                <IconButton>
                  <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                </IconButton>
              </Grid>
              <Divider />
              <Box sx={{ maxHeight: "400px" }}>
                <Typography
                 textAlign="left"
                  variant="h4"
                  sx={{ m: 3, ml: 1, mb: 1, fontWeight: 500 }}
                >
                  Group projects
                </Typography>
                <Typography
                textAlign="left"
                  sx={{
                    ml: 1,
                    fontSize: "20px",
                    fontWeight: 530,
                    color: "#2684FF",
                  }}
                >
                  Manage a huge team, divide the
                  <br />
                  work, monitor the workflow.
                </Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>

        <Box
          sx={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,1), rgba(0,0,0,0.5))",
            minHeight: "550px",
            width: "100vw",
            display: "flex",

            textAlign: "left",

            left: 0,
          }}
        >
          <Container>
            <Grid>
              <Typography variant="h4" fontWeight={500} sx={{ mt: 4 }}>
                Easy to manage....!
              </Typography>
              <Typography variant="h4" fontWeight={500} sx={{ mt: 3 }}>
                Now using Projestro you can manage
                <br />a large team easily.
              </Typography>
            </Grid>
            <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
    <CustomCard
      title="Free"
      description="Small individual projects are free.Anyone can use"
      backgroundColor="#4C9AFF"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <CustomCard
      title="Gold"
      description="Small Group projects. Enables group chat and other features."
      backgroundColor="#E19325"
    />
  </Grid>
  <Grid item xs={12} sm={6} md={4}>
    <CustomCard
      title="Platinum"
      description="Large Group projects. Unlocks all features. Enables individual calls."
      backgroundColor="#838080"
    />
  </Grid>
</Grid>

          </Container>
        </Box>

<FourCardComponent/>
<TwoBoxComponent/>
        <BottomBar />


      </Stack>
    </>
  );
}

export default HomeAfterSignIn;
