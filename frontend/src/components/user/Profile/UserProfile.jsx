import React from "react";
import ProfileCard from "../../customItems/ProfileCard";
import Navbar from "../Navbar";
import {
  Box,
  Container,
  Grid,
  Card,
  Typography,
  CardContent,
  CardMedia,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { Edit, Facebook, Twitter, Instagram } from "@mui/icons-material";


const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{ height:"100vh", backgroundColor: "#f4f5f7" }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Box
            item
            maxWidth="1250px"
            maxHeight="1000px"
            borderRadius="10px"
            marginTop="50px"
                      >
            <Grid
              xs={12}
              container
              justifyContent="space-between"
              sx={{ padding: "0" }}
            >
              <Grid>
                <Box
                  item
                  sx={{
                    minWidth:"300px",
                    minHeight: "610px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    background:
                      "linear-gradient(to right bottom, #2684FF,#79F2C0)",
                  }}
                >
                  <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                  >
                    <Avatar
                      alt="Profile"
                      src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                      sx={{ width: 120, height: 120, my: 3 }}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="h5" mt="5px" component="div">
                      User Name
                    </Typography>
                    <Typography variant="body1" mt="5px" color="textSecondary">
                      Web Designer
                    </Typography>
                    <Typography variant="body1" mt="5px" component="div">
                      muhammedarifsha2001@gmail.com
                    </Typography>
                    <Typography variant="body1" mt="5px" color="textSecondary">
                      Mob: 7856453434
                    </Typography>
                  </Grid>
                  {/* <Grid>
                      <Edit/>
                    </Grid> */}
                </Box>
              </Grid>
              <Grid>
                <Box
                  item
                  className="box2"
                  sx={{
                    maxWidth: "900px",
                    maxHeight: "1000px",
                    borderTopRightRadius: "10px",
                    borderBottomRigRadius: "10px",
                    background:
                      "linear-gradient(to right bottom, #9CBFED,#9BE9C9)",
                  }}
                >
                  <Grid container sx={{ justifyContent: "space-evenly" }}>
                    <ProfileCard title="Projects" />
                    <ProfileCard title="About" />
                    <ProfileCard title="Details" />
                    <ProfileCard title="Edit" />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default UserProfile;


