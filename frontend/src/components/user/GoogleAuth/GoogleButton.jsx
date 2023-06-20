import { React, useEffect ,useState} from "react";
import GoogleLogin from "react-google-login"
import jwt_decode from 'jwt-decode'
import axios from '../../../Axios';

function GoogleButton() {
const [user,setUser]  = useState({})
   
  function handleCallbackResponse(response) {
   console.log("Encoded JWT token : "  + response.credential);
   let userObject = jwt_decode(response.credential)
   console.log(userObject)
   setUser(userObject)
   console.log("axios google")
   console.log(user)
   console.log(user.name)
   axios.post("/signin/google",{user}).then((res)=>{

   }).catch
  }
  useEffect(() => {
   
    google.accounts.id.initialize({
      client_id:import.meta.env.VITE_GOOGLE_CLIENT_ID,
     callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    console.log("google" + import.meta.env.VITE_GOOGLE_CLIENT_ID);
  }, []);
  return (
    <div>
      <div id="signInDiv"></div>
    </div>
  );
}

export default GoogleButton;
