import { React, useState } from "react";
import LoginImages from "../LoginImages";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function Otp() {
  const navigate = useNavigate();

  const [FormErrors, setFormErrors] = useState({});
  const [otp, setOtp] = useState("");
  const storedEmail = useSelector((state) => state.emailReducer.email);
  console.log(storedEmail + "stored email");
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};
    console.log(otp);
    console.log(storedEmail + "   " + "email of user");
    axios
      .post("/signup/verifyotp", { otp, email: storedEmail })
      .then((res) => {
        if (res.status === 200) {
          console.log(`${res.data.message}`);
          console.log("user verify sucessfull");
          navigate("/signin");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.log(`${error.response.data.message}`);
          errors.otp = `${error.response.data.message}`;
        } else {
          console.log("Error during verify otp:", error.message);
        }
        setFormErrors(errors);
      });
  };
  const handleChange = (e) => {
    const { value } = e.target;
    setOtp(value);
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
              OTP Verification
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0.5 }}
            >
              <TextField
                margin="normal"
                fullWidth
                id="otp"
                label="Enter Otp"
                name="otp"
                type="otp"
                autoComplete="otp"
                onChange={handleChange}
                autoFocus
                error={!!FormErrors.otp}
                helperText={FormErrors.otp}
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
                Submit
              </Button>
              <Grid container alignItems="center" sx={{ my: 0.5 }}>
                <Grid item>
                  <Typography sx={{ fontWeight: "700" }}>
                    Don't get otp?
                  </Typography>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body"
                    sx={{
                      textDecoration: "none",
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  >
                    Resent Otp
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography sx={{ my: 1, textAlign: "left", fontSize: "14px" }}>
            Don't share the otp to anyone.
          </Typography>
        </Container>
      </Box>
    </>
  );
}

export default Otp;
