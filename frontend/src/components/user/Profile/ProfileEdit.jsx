import { React, useEffect, useReducer, useState } from "react";
import Navbar from "../Navbar";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import Avatar from "react-avatar-edit";

import {
  Box,
  Container,
  Grid,
  TextField,
  Typography,
  Autocomplete,
  Button,
} from "@mui/material";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function ProfileEdit() {
  const [FormErrors, setFormErrors] = useState({});
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [otpPage, setOtpPage] = useState("");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  let errors = {};
  //  image update code
  const [profileImage, setProfileImage] = useState("");
  const [imageCrop, setImageCrop] = useState(false);
  // const [src,setSrc] = useState(false)
  const [pview, setpview] = useState("");
  const [profile, setProfile] = useState("");
  const ProfileImage = profile;

  const handleProfileImage = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substring(0, 5) == "image") {
      setProfileImage(file);
    } else {
      setProfileImage(null);
    }
  };
  const onCrop = (view) => {
    setpview(view);
  };
  const onClose = () => {
    setpview(null);
  };
  const SaveCropImage = () => {
    setProfile(pview);
    setImageCrop(false);
    console.log(profile + "profile");
  };

  const img =
    "https://images.unsplash.com/photo-1688283581052-7da75fe95a5c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80";
  // image update code

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
    console.log(profileData);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("hi edit");
  //   console.log(profileData);
  //   await axios
  //     .post(
  //       "/user/profile/edit",
  //       { profileData },
  //       { headers: { "x-access-token": localStorage.getItem("token") } }
  //     )
  //     .then((res) => {
  //       if (res.status === 200) {
  //         console.log("user updated succesfully");
  //         console.log(res.data.user)
  //         navigate('/user/profile')
  //       } else if (res.status === 202) {
  //         console.log("set otp page");
  //         setOtpPage(res.data.number);
  //         console.log(otpPage + "otp page");
  //       }
  //     })
  //     .catch((error) => {
  //       if (error.status === 404) {
  //         console.log("token error or user not found");
  //       }
  //     });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", profile); // Append the selected image file
    formData.append("profileData", JSON.stringify(profileData));
    // Append other profile data to the formData

    try {
      console.log(formData + "form data");
      const response = await axios.post("/user/profile/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        console.log("User updated successfully");
        console.log(response.data.user);
        navigate("/user/profile");
      } else if (response.status === 202) {
        console.log("Set OTP page");
        setOtpPage(response.data.number);
        console.log(otpPage + "otp page");
      }
    } catch (error) {
      if (error.status === 404) {
        console.log("Token error or user not found");
      }
    }
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
        { otp: otp, number: otpPage },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          setOtpPage("");
          setOtp("");
          navigate("/user/profile");
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          errors.otp = `${error.response.data.message}`;
          setFormErrors(errors);
        }
        if (error.response.status === 402) {
          console.log(error.response.data.message);
          errors.otp = `${error.response.data.message}`;
          setFormErrors(errors);
        }
      });
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
                {/* profile image components */}
                <Grid container alignItems={"center"} justifyContent={"center"}>
                  <img
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                    onClick={() => setImageCrop(true)}
                    src={
                      ProfileImage.length
                        ? ProfileImage
                        : profileData.profilePicture
                    }
                  />
                  <InputText
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImage}
                    style={{ display: "none" }}
                  />
                  <Dialog
                    visible={imageCrop}
                    header={() => <p>Update Profile</p>}
                    onHide={() => setImageCrop(false)}
                    position="top"
                    modal
                    style={{ width: "550px" }}
                  >
                    <Avatar
                      width={500}
                      height={500}
                      onCrop={onCrop}
                      onClose={onClose}
                      // src = {src}
                      shadingColor="#474649"
                      backgroundColor="#474649"
                    />

                    <Grid justifyContent={"center"}>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          my: 4,
                          borderRadius: "3px",
                          height: "40px",
                          fontWeight: "700",
                          backgroundColor: "green",
                        }}
                        onClick={SaveCropImage}
                      >
                        ADD
                      </Button>
                    </Grid>
                  </Dialog>
                </Grid>
                {/* profile image components */}
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
                  <TextField
                    label="Working As"
                    name="job"
                    value={profileData.job}
                    InputLabelProps={{
                      ...(profileData.job
                        ? { shrink: true }
                        : { shrink: false }),
                    }}
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
