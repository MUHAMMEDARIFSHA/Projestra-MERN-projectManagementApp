import { React, useEffect ,useState} from "react";
import LoginImages from "../LoginImages";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function EditPassword() {
 const [userEmail,setUserEmail] = useState('')
 const [FormErrors,setFormErrors] = useState({})
const [password,setPassword] = useState('')
 const navigate = useNavigate()


 const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(password+ " sub")
  axios.post('/editpassword',{password,userEmail}).then((res)=>{
  if(res.status===200){
    navigate('/signin')
  }
  }).catch((error)=>{
    if(error.response.status===500){
      console.log("error occure")
      navigate("/signup")
    }
  })

 }
 const handleChange=(e)=>{
  e.preventDefault()
     setPassword(e.target.value)
   console.log(password)
 }

  const verifyEmailToken = () => {
    const url = window.location.pathname;
    console.log("hi");
    console.log(url);
    const tokens = extractTokensFromUrl(url);
    console.log(tokens.token1);
    console.log(tokens.token2);
    const userId = tokens.token1;
    const token = tokens.token2;
    axios.post("/forgotpassword/verifedtoken",{userId,token}).then((res)=>{
          if(res.status===200){
            console.log("success");
            setUserEmail(res.data.userEmail)
          }
    }).catch((error)=>{
        if (error.response && error.response.status === 404) {
            console.log(`${error.response.data.message}`);
                // navigate('/signin')
          }
          // navigate('/signin')
    })
  };
  // a regex function to extract the userId and the token
  function extractTokensFromUrl(url) {
    const tokensRegex = /\/user\/([^/]+)\/verify\/([^/]+)/;
    const match = url.match(tokensRegex);
    if (match && match[1] && match[2]) {
      return {
        token1: match[1],
        token2: match[2],
      };
    }
    return null;
  }
  //   a regex function to extract the userId and the token
  useEffect(() => {
    verifyEmailToken();
  }, []);
  return(
    <>
    {userEmail===''?<div>no user</div>:<div>
      
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
          Update Password
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
                id="password"
                label="New password"
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
                  mt: 2,
                  mb: 2,
                  borderRadius: "3px",
                  height: "40px",
                  fontWeight: "700",
                  backgroundColor: "blue",
                }}
              >
               Edit Password
              </Button>
             
            </Box>
          </Box>
          
         
        </Container>
      </Box>
      </div>}
    </>
  

  )
}

export default EditPassword;
