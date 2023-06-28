import { React, useEffect, useReducer, useState } from "react";
import Navbar from "../Navbar";
import axios from "../../../Axios";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  Autocomplete,
  Button,
} from "@mui/material";
import { Javascript } from "@mui/icons-material";
import { setUser } from "../../../features/user/userSlice";

function ProfileEdit() {
  const [FormErrors, setFormErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [otpPage, setOtpPage] = useState("");
  const [otp, setOtp] = useState("");
 let errors={}
  const handleProfile = () => {
    console.log("profile");
  };

  const getUserData = async () => {
    console.log("get user data in edit page");
    await axios
      .get("/user/profile/getdata", {
        headers: { "x-access-token": localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.user);
          setProfileData(res.data.user);
        }
      })
      .catch((error) => {
        if (response.error && response.error.status === 404) {
          console.log(error.response.data.message);
        }
      });
  };
  const handleSkillsChange = (event, value) => {
    setSelectedSkills(value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi edit");
    console.log(profileData);
    await axios
      .post(
        "/user/profile/edit",
        { profileData },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("user updated succesfully");
          dispatch(setUser(res.data.user));
        } else if (res.status === 202) {
          console.log("set otp page");
          setOtpPage(res.data.number);
          console.log(otpPage + "otp page");
        }
      })
      .catch((error) => {
        if (error.status === 404) {
          console.log("token error or user not found");
        }
        console.log(error.data.error);
      });
  };
  const otpChange = (e) => {
    setOtp(e.target.value);
  };
  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    console.log("otp submit");
    await axios
      .post(
        "/user/profile/edit/number/otp",
        { otp: otp ,number:otpPage},
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status===200) {
             setOtpPage("")
             setOtp('')
        }
      }).catch((error)=>{
        if(error.response.status===400){
          console.log(error.response.data.message);
          errors.otp=`${error.response.data.message}`
          setFormErrors(errors)
        }
        if(error.response.status===402){
          console.log(error.response.data.message);
          errors.otp=`${error.response.data.message}`
          setFormErrors(errors)
        }
      })
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 4,
          background: "linear-gradient(to right , #73a7eb,#adf0d4)",
          marginTop: "60px",
          minHeight: "685px",
        }}
      >
        {otpPage == "" ? (
          <Container maxWidth="md">
            <Typography
              variant="h4"
              fontWeight="600"
              fontFamily="revert"
              my={4}
              sx={{ color: "success" }}
            >
              Edit Profile
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid container alignItems={"center"} justifyContent={"center"}>
                  <Avatar
                    onClick={handleProfile}
                    alt="Profile"
                    src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
                    sx={{ width: 120, height: 120, my: 3 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Name"
                    InputLabelProps={{
                      ...(profileData.username
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    name="username"
                    fullWidth
                    value={profileData.username}
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Email"
                    InputLabelProps={{
                      ...(profileData.email
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    name="email"
                    fullWidth
                    value={profileData.email}
                    variant="outlined"
                    color="success"
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Phone Number"
                    InputLabelProps={{
                      ...(profileData.number
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    name="number"
                    type="number"
                    fullWidth
                    value={profileData.number}
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    label="About"
                    fullWidth
                    variant="outlined"
                    name="about"
                    value={profileData.about}
                    multiline
                    rows={4}
                    color="success"
                    InputLabelProps={{
                      ...(profileData.about
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Location"
                    name="location"
                    value={profileData.location}
                    InputLabelProps={{
                      ...(profileData.location
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <TextField
                    label="Company"
                    name="company"
                    value={profileData.company}
                    InputLabelProps={{
                      ...(profileData.company
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
                    fullWidth
                    variant="outlined"
                    color="success"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Autocomplete
                    multiple
                    fullWidth
                    options={["Java", "Javascript", "Node", "Python", "React"]}
                    value={selectedSkills}
                    onChange={handleSkillsChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Skills"
                        variant="outlined"
                        color="success"
                      />
                    )}
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
                  EDIT
                </Button>
              </Grid>
            </Box>
          </Container>
        ) : (
          // here starts the otp tag
          <Container>
            <Grid
              component="form"
              onSubmit={handleSubmitOtp}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h4"
                fontWeight="600"
                fontFamily="revert"
                my={4}
                sx={{ color: "success" }}
              >
                Enter the OTP
              </Typography>
              <Typography sx={{ color: "red", fontWeight: "500" }}>
                {FormErrors.otp}
              </Typography>
              <TextField
                label="OTP"
                name="otp"
                value={otp}
                type="password"
                onChange={otpChange}
              ></TextField>
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
                SUBMIT
              </Button>
            </Grid>
          </Container>
        )}
      </Box>
    </>
  );
}

export default ProfileEdit;
