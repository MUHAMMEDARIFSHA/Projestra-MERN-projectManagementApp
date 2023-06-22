

import React from 'react';
import Navbar from '../Navbar';
import { Box, Container, Grid, Card, Typography, CardContent, CardMedia, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import { Edit, Facebook, Twitter, Instagram } from '@mui/icons-material';

const GradientCustomCard = styled(Card)`
  background: linear-gradient(to right bottom, rgba(246, 211, 101, 1), rgba(253, 160, 133, 1));
  border-radius: 0.5rem;
`;

const UserProfile = () => {
  return (
    <>
    <Navbar/>
    
    
    </>
  );
};

export default UserProfile;
















































{/* <Box className="vh-100" sx={{ backgroundColor: '#f4f5f7',marginTop:"73px" }}>
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
    </Box> */}

