import { React, useState } from "react";
import LoginImages from "../LoginImages";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSetAuth } from "../../../features/userAuth/userSlice";
import GoogleButton from "../GoogleAuth/GoogleButton";
import { setEmail } from "../../../features/userAuth/emailSlice";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import GoogleIcon from "@mui/icons-material/Google";

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [FormErrors, setFormErrors] = useState({});
  const [FormValues, setFormValues] = useState({});
  const handleSubmit = (e) => {
    const errors = {};
    e.preventDefault();
    console.log(FormValues);
    axios
      .post("/signin", { FormValues })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.jwtToken);
          localStorage.setItem("token", res.data.jwtToken);
          console.log("user sign sucessfull");
          dispatch(userSetAuth());
          navigate("/home");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          console.log(`${error.response.data.message}`);
          errors.signin = `${error.response.data.message}`;
        } else {
          console.log("Error during signup:", error.message);
        }
        setFormErrors(errors);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
  };
  const navigateSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };
  const forgotPassword = async (e) => {
    const errors = {};
    e.preventDefault();
    console.log("forgot password");
    if (!FormValues.email) {
      errors.forgot = "please enter a email";
      setFormErrors(errors);
    } else {
      setFormErrors({});
 await axios.post("/signin/forgotpassword", { email: FormValues.email })
        .then((res) => {
          if (res.status === 200) {
            console.log("email found");
            dispatch(setEmail(FormValues.email))
            errors.success = res.data.message
          }
          setFormErrors(errors)
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            console.log(`${error.response.data.message}`);
            errors.forgot = `${error.response.data.message}`;
          }
          setFormErrors(errors);
        });
    }
  };

  return (
    <>
      <LoginImages />
      <Box
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Container
          item
          component="main"
          sx={{
            boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
            borderRadius: "5px",
            width: "420px",
            padding: "20px",
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
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0.5 }}
            >
              <Typography sx={{color:"green" ,fontWeight:"500"}}>
                {FormErrors.success}
              </Typography>
              <Typography sx={{ color: "red", fontWeight: "500" }}>
                {FormErrors.signin || FormErrors.forgot}
              </Typography>
              
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={handleChange}
                autoFocus
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
              />
              <Grid container alignItems="center" sx={{}}>
                <Grid item>
                  <Typography
                    onClick={forgotPassword}
                    sx={{
                      fontWeight: "600",
                      cursor: "pointer",
                      color: "#89CFF0",
                    }}
                  >
                    Forgot password?
                  </Typography>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  borderRadius: "3px",
                  height: "40px",
                  fontWeight: "700",
                  backgroundColor: "blue",
                }}
              >
                Sign In
              </Button>
              <Grid container alignItems="center" sx={{ my: 0.5 }}>
                <Grid item>
                  <Typography sx={{ fontWeight: "700" }}>
                    Don't have a account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    onClick={navigateSignUp}
                    variant="body"
                    sx={{
                      textDecoration: "none",
                      fontSize: "18px",
                      fontWeight: "600",
                      cursor: "pointer",
                      ml: 1,
                    }}
                  >
                    Sign UP
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography sx={{ my: 1, textAlign: "left", fontSize: "14px" }}>
            By Sign In you are agreeing all the terms and conditionsof the
            projestro plateform.T&C
          </Typography>
          <Grid>
            <Typography
              sx={{ fontWeight: "700", fontSize: "20px", opacity: 0.5 }}
            >
              OR
            </Typography>
            <GoogleButton />
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default SignIn;
