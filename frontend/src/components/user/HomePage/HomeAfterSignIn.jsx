import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import Navbar from "../Navbar";
import styles from "../../../styles/home.module.css";

import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Card,
  CardHeader,
  Divider,
  IconButton,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

function HomeAfterSignIn() {
  return (
    <>
      {/*  banner */}
      <Stack>
        <Box
          sx={{
            background: "linear-gradient(to right , #2684FF ,#79F2C0)",
            height: "550px",
            width: "100vw",
            marginTop: "5rem",
            display: "flex",
            position: "absolute",
            textAlign: "left",
            top: 0,
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
            height: "500px",
            width: "100vw",
            display: "flex",
            position: "absolute",
            textAlign: "left",
            left: 0,
            top: 630,
          }}
        >
          <Container>
            <Grid container justifyContent={"center"} >
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
                      ml: 1,mb:10,
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
            background: "linear-gradient(to right , #2684FF ,#79F2C0)",
            height: "550px",
            width: "100vw",
            marginTop: "5rem",
            display: "flex",
            position: "absolute",
            textAlign: "left",
       
            left: 0,
          }}
        ></Box>
      </Stack>
    </>
  );
}

export default HomeAfterSignIn;
