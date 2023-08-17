import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../Axios";

import { Container, Paper } from "@mui/material";
import { Typography, Button } from "@mui/material";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";

function StripePage() {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false)
  const toPayment = () => {
    console.log("to payment");
    axios
      .post(
        "/payment/create-payment",
        { amonunt: 1000 },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("payment ok backend");
          const url = res.data.paymentUrl;
          console.log(url);
          window.location.href = url;
        }
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const backgroundImageStyle = {
    backgroundImage: "url('https://img.freepik.com/free-vector/blue-polygonal-shapes-background_1053-434.jpg?size=626&ext=jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    height: '100vh', // Adjust the height as needed
  };


  return (
    <div style={backgroundImageStyle}>
    
      <Container
        style={{
          display: "flex", // Use flex display
          justifyContent: "center", // Center horizontally
          alignItems: "center", // Center vertically
     
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "2rem",
            backgroundImage: "linear-gradient(to right, #CADDF6, #70A6ED)",
            marginTop: 70,
          }}
        >
          <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{
              textAlign: "center",
              maxWidth: "100%",
              width: 800,
              // to make the demo resizable
              // resize: 'horizontal',
              overflow: "auto",
            }}
          >
            <CardOverflow
              variant="solid"
              color="primary"
              sx={{
                flex: "0 0 200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: "var(--Card-padding)",
              }}
            >
              <Typography variant="h4" fontWeight="700" textColor="#fff">
                ₹ 999
              </Typography>
              <Typography textColor="primary.200" fontWeight={600}>
                1 month
              </Typography>
            </CardOverflow>
            <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
              <AspectRatio ratio="22/8" objectFit="contain" variant="plain">
                <img alt="" src="/images/payment image.png" />
              </AspectRatio>
              <CardContent>
                <Typography
                  variant="h4"
                  gutterBottom
                  fontFamily="serif"
                  fontWeight="600"
                  color="#e19325"
                  mt={1}
                >
                  Subscription Details
                </Typography>
                <Typography variant="body1">
                  Get access to chat features for efficient project
                  management.Connet with all the group members.
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  style={{ marginTop: "1rem" }}
                >
                  Features
                </Typography>
                <ul style={{ marginTop: "0.5rem" }}>
                  <li>Real-time chat with project members</li>
                  <li>File sharing and collaboration</li>
                  <li>Priority support</li>
                </ul>
              </CardContent>
              <Button
                variant="contained"
                sx={{
                  my: 1,
                  borderRadius: "25px",
                  height: "45px",
                  fontWeight: "700",
                  backgroundColor: "#f2c900",
                }}
                onClick={toPayment}
              >
                Get subcription
              </Button>
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </div>
  );
}

export default StripePage;
