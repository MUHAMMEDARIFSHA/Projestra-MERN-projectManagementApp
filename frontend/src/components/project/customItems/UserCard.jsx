import * as React from "react";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardActions from "@mui/material/CardActions"; // Correct import path
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import Avatar from "@mui/joy/Avatar";
import axios from "../../../Axios"

export default function UserCard({ user ,projectId,updateProject}) {
  const removeMember= async(id)=>{
    console.log("remove member")
    console.log(id +"id   "  +projectId+" project id")
    await axios.post('/group/member/remove',{memberId:id,projectId}, { headers: { "x-access-token": localStorage.getItem("token")}})
    .then((res)=>{
      if(res.status===200){
        console.log(res.data.message);
        console.log(res.data.projectData);
        const projectData = res.data.projectData
        updateProject(projectData)
      }

    }).catch((error)=>{

    })
  }
  return (
    <Card
      sx={{
        textAlign: "center",
        alignItems: "center",
        overflow: "auto",
        "--icon-size": "100px",
      }}
      style={{ width: "200px" }} // Set the width of the card to 100px
    >
      <CardOverflow variant="solid" style={{ background: 'linear-gradient(to right, #2684FF, #79F2C0)',height:"85px" }}>
        <Avatar
          sx={{
            m: "auto",
            position: "relative",
            transform: "translateY(40%)",
            width: "90px",
            height: "90px",
          }}
          src={user.profilePicture}
        />
      </CardOverflow>
      <Typography
      p={0}
        level="h2"
        fontSize="xl"
        sx={{ mt: "calc(var(--icon-size) / 3)" }}
      >
        {user.username ? user.username : ""}
      </Typography>
      <Typography variant="h4" p={0}>{user.email?user.email:""}</Typography>
      <CardActions
        orientation="vertical"
        buttonflex={1}
        sx={{
          "--Button-radius": "40px",
          justifyContent: "center",
          width: "clamp(min(100%, 160px), 50%, min(100%, 200px))",
        }}
      >
        <Button variant="solid" color="primary"  onClick={()=>{removeMember(user._id)}}>
          Remove
        </Button>
      </CardActions>
    </Card>
  );
}
