import React from "react";
import { Box, Grid, Typography, Container, Divider } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

function BottomBar() {
  const products = [
    "Software",
    "Projestra",
    "Service Management",
    "Product Discovery",
    "Confluence",
  ];
  const resources = [
    "Technical Support",
    "Purchasing & licensing",
    "Projestra Community",
    "Knowledge base",
    "Marketplace",
    "My Account",
  ];
  const expand = [
    "Partners",
    "Training & Certification",
    "Documentation",
    "Developer Resources",
    "Enterprise services",
  ];

  const about = [
    "Company",
    "Careers",
    "Events",
    "Blogs",
    "Investor Relations",
    "Trust & Security",
  ];

  return (
    <Box
      sx={{
        background: "#F4F5F7",
        height: "auto", // Instead of fixed height, set height to auto for responsiveness
        width: "100vw",
        display: "flex",
        textAlign: "left",
        left: 0,
      }}
    >
      <Grid container m={1} spacing={4}>
        {" "}
        {/* Add spacing between grid items */}
        <Grid item xs={12} md={2} ml={15}  display="flex" flexDirection="column">
          {" "}
          {/* Adjusted xs and md values */}
          <Typography
            component="h3"
            variant="h4"
            color="#245194"
            fontWeight="600"
            sx={{ display: { xs: "none", md: "flex" }, mt: 4, mr: 4 }} // Adjusted margin values
          >
            Projestra
          </Typography>
        </Grid>
        <Grid item xs={6} md={2} display="flex" flexDirection="column">
          {" "}
          {/* Adjusted xs and md values */}
          <Typography variant="body1" fontWeight={600} mt={4} mb={2}>
            PRODUCTS
          </Typography>
          {products.map((m, index) => (
            <Typography key={index} variant="subtitle1">
              {m}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6} md={2} display="flex" flexDirection="column">
          {" "}
          {/* Adjusted xs and md values */}
          <Typography variant="body1" fontWeight={600} mt={4} mb={2}>
            RESOURCES
          </Typography>
          {resources.map((m, index) => (
            <Typography key={index} variant="subtitle1">
              {m}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6} md={2} display="flex" flexDirection="column">
          {" "}
          {/* Adjusted xs and md values */}
          <Typography variant="body1" fontWeight={600} mt={4} mb={2}>
            EXPAND & LEARN
          </Typography>
          {expand.map((m, index) => (
            <Typography key={index} variant="subtitle1">
              {m}
            </Typography>
          ))}
        </Grid>
        <Grid item xs={6} md={2} display="flex" flexDirection="column">
          {" "}
          {/* Adjusted xs and md values */}
          <Typography variant="body1" fontWeight={600} mt={4} mb={2}>
            ABOUT PROJECTRA
          </Typography>
          {about.map((m, index) => (
            <Typography key={index} variant="subtitle1">
              {m}
            </Typography>
          ))}
        </Grid>
        <Grid mt={2} xs={12} md={12}>
          <Divider component="li" />
        </Grid>
        <Grid container spacing={0} alignItems={"center"} mt={3} mb={2}>
          <Grid item ml={15} xs={6} md={3} display="flex" flexDirection="row">
            <Typography variant="h6" fontWeight={500}>
              © 2023 Projestra. All rights reserved.
            </Typography>
          </Grid>
         
          <Grid
            item
            m={1}
            xs={4}
            md={2}
            ml={5}
            display="flex"
            flexDirection="row"
            sx={{ cursor: "pointer" }}
          >
            <InstagramIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
            <FacebookIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
            <LinkedInIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
            <YouTubeIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
            <GitHubIcon sx={{ fontSize: "40px", marginRight: "10px" }} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BottomBar;

