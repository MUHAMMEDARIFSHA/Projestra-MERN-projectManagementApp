import { React, useState } from "react";
import LoginImages from "../user/LoginImages"
import axios from '../../Axios'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function AdminSignIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  const [FormErrors, setFormErrors] = useState({});
  const [FormValues, setFormValues] = useState({});
  const handleSubmit = (e) => {
    const errors = {}
    e.preventDefault();
    console.log(FormValues)
    axios.post('/admin/signin',{FormValues})
    .then(res=>{
        if(res.status === 200){
            console.log("admin sign sucessfull")
            // dispatch(userSetAuth())
             navigate('/admin/home')
        }
    })
    .catch((error)=>{
        if(error.response && error.response.status===401){
            console.log(`${error.response.data.message}`)
            errors.adminsignin=`${error.response.data.message}`
        }
        else{
            console.log("Error during signup:", error.message);
        }
        setFormErrors(errors)
    })
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...FormValues, [name]: value });
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
              Admin SignIn
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 0.5 }}
            >
              <Typography sx={{ color: "red", fontWeight: "500" }}>
                {FormErrors.adminsignin}
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
                // error={!!FormErrors.signin}
                // helperText={FormErrors.signin}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 6,
                  borderRadius: "3px",
                  height: "40px",
                  fontWeight: "700",
                  backgroundColor: "blue",
                }}
              >
                Admin Sign In
              </Button>
              
              
            </Box>
          </Box>
       
        </Container>
      </Box>
    </>
  );
}

export default AdminSignIn;
