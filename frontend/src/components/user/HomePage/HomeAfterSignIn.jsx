import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "../Navbar";
import styles from "../../../styles/home.module.css";
import CustomCard from "../../customItems/CustomCard";



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
  return (
    <>
      <Navbar />
      {/*  banner */}
      <Stack direction="column" marginTop="70px">
        <Box
          sx={{
            background: "linear-gradient(to right , #2684FF ,#79F2C0)",
            height: "550px",
            width: "100vw",
            display: "flex",
            textAlign: "left",
            left: 0,
          }}
        >
          <Container>
            <Grid container alignItems={"center"}>
              <Grid item>
                <Typography
                  sx={{ color: "white", fontSize: "42px", marginTop: "-170px" }}
                >
                  Let's start your project...!
                </Typography>
                <Typography
                  sx={{ mt: 3, mb: 4, color: "white", fontSize: "38px" }}
                >
                  Move Fast - Stay Together..!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "500",
                    mt: 4,
                    mb: 4,
                    color: "white",
                  }}
                >
                  Top trending software for project management.
                </Typography>
              </Grid>
              <Grid item>
                <img
                  src="/images/homepage-image2.png"
                  alt="main-banner"
                  style={{
                    maxWidth: "600px",
                    paddingLeft: "65px",
                    paddingTop: "5px",
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* contants */}
        <Box
          sx={{
            background: "linear-gradient(to bottom , white ,#B3D4FF)",
            height: "550px",
            width: "100vw",
            display: "flex",
            textAlign: "left",
            left: 0,
          }}
        >
          <Container>
            <Grid container justifyContent={"center"}>
              <Typography
                item
                sx={{ fontSize: "50px", fontWeight: 550, marginTop: 7 }}
              >
                Choose your project type...!
              </Typography>
            </Grid>
            <Grid container justifyContent={"space-between"} sx={{ mt: 10 }}>
              <Card item sx={{ width: 350 }}>
                <Grid sx={{ background: "#2684FF", maxHeight: "50px" }}>
                  <IconButton>
                    <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                  </IconButton>
                </Grid>
                <Divider />
                <Box sx={{ maxHeight: "400px" }}>
                  <Typography
                    variant="h4"
                    sx={{ m: 3, ml: 1, mb: 1, fontWeight: 500 }}
                  >
                    Individual projects
                  </Typography>
                  <Typography
                    sx={{
                      ml: 1,
                      mb: 10,
                      fontSize: "20px",
                      fontWeight: 530,
                      color: "#2684FF",
                    }}
                  >
                    Manage your own projects,<br></br>
                    create and deploy your ides.
                  </Typography>
                </Box>
              </Card>

              <Card item sx={{ width: 350 }}>
                <Grid sx={{ background: "#2684FF", maxHeight: "50px" }}>
                  <IconButton>
                    <ArticleIcon sx={{ color: "white", fontSize: "40px" }} />
                  </IconButton>
                </Grid>
                <Divider />
                <Box sx={{ maxHeight: "400px" }}>
                  <Typography
                    variant="h4"
                    sx={{ m: 3, ml: 1, mb: 1, fontWeight: 500 }}
                  >
                    Group projects
                  </Typography>
                  <Typography
                    sx={{
                      ml: 1,
                      fontSize: "20px",
                      fontWeight: 530,
                      color: "#2684FF",
                    }}
                  >
                    Manage a huge team,divide the
                    <br />
                    work, monitor the work flow.
                  </Typography>
                </Box>
              </Card>
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            background: "linear-gradient(to bottom, rgba(255,255,255,1), rgba(0,0,0,0.5))",
            height: "550px",
            width: "100vw",
            display: "flex",

            textAlign: "left",

            left: 0,
          }}
        >
          <Container>
          <Grid>
            <Typography variant="h3" fontWeight={500}  sx={{mt:4}} >
            Easy to manage....!
            </Typography>
            <Typography variant="h3" fontWeight={500} sx={{mt:3}} >
            Now using Projestro you can manage<br/>
             a large team easily.
            </Typography>
          </Grid>
          <Grid  display="flex" justifyContent="space-between">
          <CustomCard 
          title="Free"
          description="Small individual projects are free."
          backgroundColor="#4C9AFF"/>
             <CustomCard 
          title="Gold"
          description="Small Group projects.
          Enables group chat and other features."
          backgroundColor="#E19325"/>
             <CustomCard 
          title="Platinum"
          description="Large Group projects.
          Unlocks all features.
          Enables individual calls."
          backgroundColor="#838080"/>
          </Grid>
              </Container>
        </Box>
      </Stack>
    </>
  );
}

export default HomeAfterSignIn;
