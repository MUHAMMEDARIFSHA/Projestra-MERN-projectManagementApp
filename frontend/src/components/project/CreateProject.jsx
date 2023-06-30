import React from 'react';
import Navbar from '../user/Navbar';
import { Box, Container, Grid,Typography, TextField, Button } from '@mui/material';

function CreateProject() {
    const handleChange =()=>{

    }
    const handleSubmit =()=>{

    }
  return (
    <>
    <Navbar/>
    <Box
        sx={{
          p: 4,
          background: "linear-gradient(to right , #73a7eb,#adf0d4)",
          marginTop: "60px",
          minHeight: "685px",
        }}
      >
    <Container maxWidth="md">
            <Typography
              variant="h4"
              fontWeight="600"
              fontFamily="revert"
              my={4}
              sx={{ color: "success" }}
            >
              Create your project..!
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
              
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Project Name"
                    // InputLabelProps={{
                    //   ...(profileData.username
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    name="projectname"
                    fullWidth
                    // value={profileData.username}
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Em"
                    // InputLabelProps={{
                    //   ...(profileData.email
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    name="email"
                    fullWidth
                    // value={profileData.email}
                    variant="outlined"
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Phone Number"
                    // InputLabelProps={{
                    //   ...(profileData.number
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    name="number"
                    type="number"
                    fullWidth
                    // value={profileData.number}
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    variant="outlined"
                    name="description"
                    // value={profileData.about}
                    multiline
                    rows={4}
                    color="success"
                    // InputLabelProps={{
                    //   ...(profileData.about
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Start Date"
                    name="startdate"
                    // value={profileData.location}
                    // InputLabelProps={{
                    //   ...(profileData.location
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="End Date"
                    name="enddate"
                    // value={profileData.company}
                    // InputLabelProps={{
                    //   ...(profileData.company
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Type of Project"
                    name="type"
                    // value={profileData.job}
                    // InputLabelProps={{
                    //   ...(profileData.job
                    //     ? { shrink: true }
                    //     : { shrink: false }),
                    // }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
               
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    my: 7,
                    borderRadius: "3px",
                    height: "40px",
                    fontWeight: "700",
                    backgroundColor: "green",
                  }}
                >
                Create Project
                </Button>
              </Grid>
            </Box>
          </Container>
       
    </Box>
    </>
  );
}

export default CreateProject;

