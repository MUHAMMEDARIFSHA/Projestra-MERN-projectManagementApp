

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function TwoBoxComponent() {
  return (
    <>
      <Box minHeight="400px" my={2}>
        <Grid container display="flex" justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            minHeight="400px"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            textAlign="left"
            style={{ backgroundColor: "#FFF9FD", padding: "20px" }}
          >
            <Typography variant="h6" ml={5} fontWeight={600}>
              Stay on track and up to date
            </Typography>
            <Typography variant="body1" mt={3} ml={5} fontWeight={600}>
              Invite people to boards and cards, leave comments, add due dates,<br></br>
              and we'll show the most important activity here. Get unlimited
              boards,<br></br> all the views, unlimited automation, and more. A growing
              team doesn't<br></br> need to mean growing pains. With best-of-breed
              features, security, privacy,<br></br> and the right tool for every step of
              your journey - Projestra Software allows you  <br></br> to scale without
              friction - regardless of your company size.
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            
            style={{
              backgroundImage: "linear-gradient(to right top, #6554C0, #F99CDB)",
              display: "flex",
              alignItems: "start",
              justifyContent: "start",
              color: "whitesmoke",
              padding: "20px",
            }}
          >
            <Typography variant="h5" mt={4} sx={{ fontWeight: 600 }}>
              The growth of  the projestro <br /> compared to  last
              year is 
              <Typography variant="h4" sx={{ fontWeight: 600 }}> 60%</Typography>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default TwoBoxComponent;

