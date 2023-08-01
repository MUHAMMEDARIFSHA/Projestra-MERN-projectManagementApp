// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// function TwoBoxComponent() {
//   return (
//     <>
//       <Box height="500px" >
//         <Grid container display="flex">
//           <Grid
//             item
//             xs={8}
//             display="flex"
//             flexDirection="column"
//             justifyContent="start"
//             textAlign='left'
//             style={{ backgroundColor: "#FFF9FD" }}
//           >
//             <Grid>
//             <Typography variant="h6" mt={3} ml={5} fontWeight={600}>
//               Stay on track and up to date
//             </Typography>
//             <Typography variant="body1" mt={3} ml={5} mr={50}fontWeight={600}>
//               Invite people to boards and cards, leave comments, add due dates,
//               and we'll show the most important activity here. Get unlimited
//               boards, all the views, unlimited automation, and more. A growing
//               team doesn't need to mean growing pains. With best-of-breed
//               features, security, privacy, and the right tool for every step of
//               your journey - Projestra Software allows you to scale without
//               friction - regardless of your company size.
//             </Typography>
//             </Grid>
           
//           </Grid>
//           <Grid
//             item
//             xs={4}
//             height="400px"
//             style={{
//               backgroundImage:
//                 "linear-gradient(to right top, #6554C0, #F99CDB)",
//             }}
//           >
//             <Typography
//               display="flex"
//               justifyContent="start"
//               variant="h5"
//               mt={4}
//               ml={3}
//               pl={3}
//               sx={{ fontWeight: 600, color: "whitesmoke" }}
//             >
//               The growth of <br></br>
//               the projestro <br></br>
//               compared to<br></br>
//               last year <br></br>is 60%
//             </Typography>
//           </Grid>
//         </Grid>
//       </Box>
//     </>
//   );
// }

// export default TwoBoxComponent;

import React from "react";
import { Box, Grid, Typography } from "@mui/material";

function TwoBoxComponent() {
  return (
    <>
      <Box height="400px">
        <Grid container display="flex" justifyContent="center">
          <Grid
            item
            xs={12}
            md={8}
            height="400px"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            textAlign="left"
            style={{ backgroundColor: "#FFF9FD", padding: "20px" }}
          >
            <Typography variant="h6" fontWeight={600}>
              Stay on track and up to date
            </Typography>
            <Typography variant="body1" mt={3} fontWeight={600}>
              Invite people to boards and cards, leave comments, add due dates,
              and we'll show the most important activity here. Get unlimited
              boards, all the views, unlimited automation, and more. A growing
              team doesn't need to mean growing pains. With best-of-breed
              features, security, privacy, and the right tool for every step of
              your journey - Projestra Software allows you to scale without
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
              alignItems: "center",
              justifyContent: "center",
              color: "whitesmoke",
              padding: "20px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              The growth of <br /> the projestro <br /> compared to <br /> last
              year <br /> is 60%
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default TwoBoxComponent;

