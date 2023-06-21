import { React, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "../../../Axios";
import { useDispatch } from "react-redux";
import { setEmail } from "../../../features/userAuth/emailSlice";
import { useNavigate } from "react-router-dom";
import { userSetAuth } from "../../../features/userAuth/userSlice";
import GoogleIcon from "@mui/icons-material/Google";


function GoogleButton() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCallbackResponse = async(response) => {
    console.log("Encoded JWT token : " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
   await axios
      .post("/signin/google", { userData:userObject })
      .then((res) => {
        if (res.status === 200) {
          console.log(`User saved: ${res.data.userEmail}`);
          localStorage.setItem("token",res.data.jwtToken)
          dispatch(setEmail(res.data.userEmail));
          dispatch(userSetAuth())
          setUser({})
          navigate("/home");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          navigate("/signup");
        } else {
          console.log("Error during signup:", error.message);
        }
      });
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
      width: "370px",
      color: "#FFFFFF",
      backgroundColor: "#4285F4",
      iconColor: "#FFFFFF",
    });
    
  }, []);
  return (
   
      <div id="signInDiv"></div>
    
  );
}

export default GoogleButton;
