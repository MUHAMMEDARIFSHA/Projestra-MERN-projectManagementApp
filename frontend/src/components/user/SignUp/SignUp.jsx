import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import LoginImages from "../LoginImages";
import axios from "../../../Axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeEmail } from "../../../action/emailOtpAction";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";

function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const initialValues = { username: "", email: "", number: "", password: "" };
  const [FormValues, setFromValues] = useState(initialValues);
  const [FormErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFromValues({ ...FormValues, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    const regexofemail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexOfNumber = /^[0-9]{10}$/;
    if (!FormValues.username) {
      errors.username = "Username required";
    } else if (FormValues.username.length < 5) {
      errors.username = "Atleast 5 characters required";
    }
    if (!FormValues.email) {
      errors.email = "Email is required ";
    } else if (!regexofemail.test(FormValues.email)) {
      errors.email = "Enter a valid email";
    }
    if (!FormValues.number) {
      errors.number = "Enter a phone number";
    } else if (!regexOfNumber.test(FormValues.number)) {
      errors.number = "Enter a valid phone number";
    }
    if (!FormValues.password) {
      errors.password = "Please enter a password";
    } else if (FormValues.password.length < 5) {
      errors.password = "Atleast 5 characters required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors("");
    }
    // validation
    axios.post("/signup", { FormValues })
      .then((res) => {
        if (res.data.success) {
          console.log(`User saved: ${res.data.useremail}`);
          dispatch(storeEmail(res.data.useremail))
          navigate('/signup/otp')
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          errors.signup = `${error.response.data.message}`;
        } else {
          console.log("Error during signup:", error.message);
        }
        setFormErrors(errors);
      });
  };
  const navigateSignIn = (e)=>{
    e.preventDefault()
    navigate('/signin')
  }

  return (
    <>
      <LoginImages />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CssBaseline />
        <Container
          component="main"
          sx={{
            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            width: "420px",
          }}
        >
          <Box
            sx={{
              marginTop: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2,
            }}
          >
            <Grid container alignItems={"center"} sx={{ ml: 12 }}>
              <Box
                component="img"
                sx={{
                  height: 60,
                  width: 60,
                  mt: 1,
                }}
                alt="The house from the offer."
                src="/images/logo-projestro.png"
              />
              <Typography
                component="h2"
                variant="h4"
                color="#245194"
                mt="10px"
                fontWeight="600"
              >
                Projestra
              </Typography>
            </Grid>

            <Typography
              component="h1"
              variant="h4"
              color="black"
              mt="5px"
              fontWeight="700"
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0.5 }}
            >
              <Typography sx={{ color: "red", fontWeight: "500" }}>
                {FormErrors.signup}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={handleChange}
                autoFocus
                error={!!FormErrors.username}
                helperText={FormErrors.username}
              />

              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                autoFocus
                error={!!FormErrors.email}
                helperText={FormErrors.email}
              />

              <TextField
                margin="normal"
                fullWidth
                name="number"
                label="Phone Number"
                id="number"
                type="number"
                autoComplete="number"
                onChange={handleChange}
                error={!!FormErrors.number}
                helperText={FormErrors.number}
              />

              <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="password"
                onChange={handleChange}
                autoFocus
                error={!!FormErrors.password}
                helperText={FormErrors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: "3px",
                  height: "40px",
                  fontWeight: "700",
                  backgroundColor: "blue",
                }}
              >
                Sign Up
              </Button>
              <Grid container alignItems="center" sx={{ my: 0.5 }}>
                <Grid item>
                  <Typography sx={{ fontWeight: "700" }}>
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    onClick={navigateSignIn}
                    variant="body"
                    sx={{
                      textDecoration: "none",
                      fontSize: "18px",
                      fontWeight: "600",
                      ml:1,
                      cursor:"pointer"
                    }}
                  >
                    Sign IN
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography sx={{ my: 1, textAlign: "left", fontSize: "14px" }}>
            By sign Up you are agreeing all the terms and conditionsof the
            projestro plateform.T&C
          </Typography>
          <Grid>
            <Typography
              sx={{ fontWeight: "700", fontSize: "20px", opacity: 0.5 }}
            >
              OR
            </Typography>
            <GoogleIcon
              sx={{ my: 2, fontSize: "35px", color: "blue", cursor: "pointer" }}
            />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default SignUp;
