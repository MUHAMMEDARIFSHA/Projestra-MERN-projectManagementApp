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

const GradientCustomCard = styled(Card)`
  background: linear-gradient(
    to right bottom,
    rgba(246, 211, 101, 1),
    rgba(253, 160, 133, 1)
  );
  border-radius: 0.5rem;
`;

const UserProfile = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{ height: "100%", backgroundColor: "#f4f5f7", marginTop: "73px" }}
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
            sx={{ backgroundColor: "black" }}
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
                    width: "300px",
                    height: "500px",
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
                     <Typography variant="h5" component="div">
                      User Name
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      Web Designer
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
                    background:
                    "linear-gradient(to right bottom, #9CBFED,#9BE9C9)",
                  }}
                >
                 <Grid container sx={{justifyContent:"space"}}  >
                 
                  <ProfileCard/>
                  <ProfileCard/>
                  <ProfileCard/>
                  <ProfileCard/>
                 
                

               
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

{
  /* <Box className="vh-100" sx={{ backgroundColor: '#f4f5f7',marginTop:"73px" }}>
      <Container className="py-5" sx={{ height: '100%' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Grid item lg={6} mb={4} mb-lg={0}>
            <GradientCustomCard sx={{ mb: 3 }}>
              <Grid container>
                <Grid item md={4} className="gradient-custom" 
                  sx={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                >
                  <CardMedia alignItems="center"
                    component="img"
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    sx={{ my: 5, width: '80px' }}
                  />
                  <Typography variant="h5" component="div">Marie Horwitz</Typography>
                  <Typography variant="body1" color="textSecondary">Web Designer</Typography>
                  <Edit sx={{ mb: 5 }} />
                </Grid>
                <Grid item md={8}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6">Information</Typography>
                    <hr sx={{ mt: 0, mb: 4 }} />
                    <Grid container sx={{ pt: 1 }}>
                      <Grid item xs={6} sx={{ mb: 3 }}>
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2" color="textSecondary">info@example.com</Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ mb: 3 }}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" color="textSecondary">123 456 789</Typography>
                      </Grid>
                    </Grid>

                    <Typography variant="h6">Information</Typography>
                    <hr sx={{ mt: 0, mb: 4 }} />
                    <Grid container sx={{ pt: 1 }}>
                      <Grid item xs={6} sx={{ mb: 3 }}>
                        <Typography variant="h6">Email</Typography>
                        <Typography variant="body2" color="textSecondary">info@example.com</Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ mb: 3 }}>
                        <Typography variant="h6">Phone</Typography>
                        <Typography variant="body2" color="textSecondary">123 456 789</Typography>
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                      <a href="#!"><Facebook sx={{ me: 3 }} fontSize="large" /></a>
                      <a href="#!"><Twitter sx={{ me: 3 }} fontSize="large" /></a>
                      <a href="#!"><Instagram sx={{ me: 3 }} fontSize="large" /></a>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </GradientCustomCard>
          </Grid>
        </Grid>
      </Container>
    </Box> */
}
