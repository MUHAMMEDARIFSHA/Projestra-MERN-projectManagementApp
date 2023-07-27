// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';

// export default function TaskCard({title,description}) {
//   return (
//     <Card >
//       <CardActionArea>
//        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
//         <Typography>card</Typography>
//           <Typography gutterBottom variant="h5" component="div">
//             {title}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//            {description}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TaskCard = ({ title, description, status, bottomColor }) => {
  let statusColor;

  // Set the color based on the status prop
  if (status === "to-do") {
    statusColor = "red";
  } else if (status === "ongoing") {
    statusColor = "orange";
  } else if (status === "completed") {
    statusColor = "green";
  } else {
    // Handle other status values if needed
    statusColor = "black"; // Default color if the status is not one of the expected values
  }

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderBottom: `15px solid ${bottomColor ? bottomColor : "green"}`,
      }}
    >
      <CardContent sx={{ padding: 0, margin: 0, paddingBottom: "0 !important" }}>
        <Typography variant="h6" sx={{ margin: "0" }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ margin: "0" }}>
          {description}
        </Typography>
        <Typography
          variant="h6"
          align="right"
          sx={{
            fontWeight: "bold",
            color: statusColor,
            margin: "0",
            paddingRight: 1,
          }}
        >
          {status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
