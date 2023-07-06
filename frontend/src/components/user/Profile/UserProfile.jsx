import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileCard from "../../customItems/ProfileCard";
import Navbar from "../Navbar";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
} from "@mui/material";
import { Edit, Folder } from "@mui/icons-material";
import InfoIcon from '@mui/icons-material/Info';
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const UserProfile = () => {
  const navigate = useNavigate()
  const userData = useSelector((state) => state.userReducer.user);
 const toEdit = ()=>{
  console.log("edit");
  navigate("/user/profile/edit")
 }
 const toProjects = ()=>{
  console.log("project");
  navigate('/user/indivitualproject')
 }

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ backgroundColor: "#f4f5f7", minHeight: "100vh" }}>
          <Grid container justifyContent="center">
            <Box
              item
              xs={12}
              md={8}
              lg={6}
              maxWidth="1250px"
              borderRadius="10px"
              marginTop={{ xs: "80px", md: "120px" }}
            >
              <Grid container justifyContent="space-between">
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      minWidth: "300px",
                      minHeight: "600px",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      background:
                        "linear-gradient(to right bottom, #2684FF,#79F2C0)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                  >
                    <Avatar
                      alt="Profile"
                      src={userData.profilePicture?userData.profilePicture:""}
                      sx={{ width: 120, height: 120, my: 3 }}
                    />
                    <Typography variant="h5" mt="5px" component="div">
                      {userData.username}
                    </Typography>
                    <Typography variant="body1" mt="5px" color="textSecondary">
                      {userData.job}
                    </Typography>
                    <Typography variant="body1" mt="5px" component="div">
                      {userData.email}
                    </Typography>
                    <Typography variant="body1" mt="5px" color="textSecondary">
                      {userData.number}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box
                    sx={{
                      maxWidth: "900px",
                      minHeight: "600px",
                      borderTopRightRadius: "10px",
                      borderBottomRigRadius: "10px",
                      background:
                        "linear-gradient(to right bottom, #9CBFED,#9BE9C9)",
                      padding: "20px",
                    }}
                  >
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={12} sm={6}>
                        <Box onClick={toProjects}>
                        <ProfileCard title="Projects" >
                          <Folder />
                        </ProfileCard>
                        </Box>
                     
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Box onClick={toEdit}>
                        <ProfileCard title="Edit Profile" >
                          <Edit />
                        </ProfileCard>
                        </Box>
                       
                      </Grid>
                    </Grid>

                    <Grid sx={{ mt: 3, mx: 3, p: 2 }}>
                      <Paper
                        sx={{
                          p: 2,
                          background:
                            "linear-gradient(135deg, #e6f0ff, #ffffff)",
                          borderRadius: "10px",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ mb: 3, fontFamily: "serif" }}
                        >
                          User Details
                        </Typography>
                        <TableContainer>
                          <Table>
                            <TableHead>
                           <TableRow>
                                {userData.about?
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                    fontWeight: "bold",
                                    color: "#000",
                                    borderBottom: "none",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <InfoIcon
                                    style={{
                                      marginRight: "10px",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <span style={{ verticalAlign: "middle" }}>
                                    About
                                  </span>
                                </TableCell>:""}
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                    color: "#000",
                                    borderBottom: "none",
                                  }}
                                >
                                  {userData.about}
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow>
                              {userData.location?
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                    fontWeight: "bold",
                                    color: "#000",
                                    borderBottom: "none",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <LocationOnIcon
                                    style={{
                                      marginRight: "10px",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <span style={{ verticalAlign: "middle" }}>
                                    Location
                                  </span>
                                </TableCell>:""}
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                    color: "#000",
                                    borderBottom: "none",
                                  }}
                                >
                                  {userData.location}
                                </TableCell>
                              </TableRow>
                              <TableRow>
                              {userData.company?
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    fontFamily: "serif",
                                    color: "#000",
                                    borderBottom: "none",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <MeetingRoomIcon
                                    style={{
                                      marginRight: "10px",
                                      verticalAlign: "middle",
                                    }}
                                  />
                                  <span style={{ verticalAlign: "middle" }}>
                                    Company
                                  </span>
                                </TableCell>:""}
                                <TableCell
                                  sx={{
                                    fontSize: "20px",
                                    fontFamily: "serif",
                                    color: "#000",
                                    borderBottom: "none",
                                  }}
                                >
                                  {userData.company}
                                </TableCell>
                              </TableRow>
                              {/* Add more user details rows here */}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Paper>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default UserProfile;
