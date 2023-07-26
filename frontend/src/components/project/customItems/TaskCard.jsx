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

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


const TaskCard = ({ title, description }) => {
  return (
    // <Card sx={{ marginBottom: 2 }}>
    //   <CardContent>
    //     <Typography variant="h6">{title}</Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       {description}
    //     </Typography>
    //     <Typography mr={1} variant='h6'  >
    //       ongoing
    //     </Typography>
    //   </CardContent>
    // </Card>
  //   <Card sx={{ marginBottom: 2 }}>
  //   <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  //     <div>
  //       <Typography variant="h6">{title}</Typography>
  //       <Typography variant="body2" color="text.secondary">
  //         {description}
  //       </Typography>
  //     </div>
  //     <Typography variant='h6' style={{ fontWeight: 'bold', color: 'orange' }}>
  //       ongoing
  //     </Typography>
  //   </CardContent>
  // </Card>
//   <Card sx={{ marginBottom: 2 }}>
//   <CardContent>
//     <Typography variant="h6">{title}</Typography>
//     <Typography variant="body2" color="text.secondary">
//       {description}
//     </Typography>
//     <Typography variant='h6' align="right" style={{ fontWeight: 'bold', color: 'orange' }}>
//       ongoing
//     </Typography>
//   </CardContent>
// </Card>
// {/* <Card sx={{ marginBottom: 2 ,padding:0 }}>
// <CardContent>
//   <Typography variant="h6" sx={{ margin: '0' }}>
//     {title}
//   </Typography>
//   <Typography variant="body2" color="text.secondary" sx={{ margin: '0' }}>
//     {description}
//   </Typography>
//   <Typography variant='h6' align="right" style={{ fontWeight: 'bold', color: 'orange', margin: '0' }}>
//     ongoing
//   </Typography>
// </CardContent>
// </Card> */}
//  <Card sx={{ marginBottom: 2, borderBottom: '10px solid green' }} >
//       <CardContent sx={{ padding: 1 }}>
//         <Typography variant="h6" sx={{ margin: '0' }}>
//           {title}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ margin: '0' }}>
//           {description}
//         </Typography>
//         <Typography variant='h6' align="right" style={{ fontWeight: 'bold', color: 'orange', margin: '0' }}>
//           ongoing
//         </Typography>
//       </CardContent>
//     </Card>  
<Card sx={{ marginBottom: 2, borderBottom: '10px solid green' }}>
  <CardContent sx={{  padding: 0  }}>
    <Typography variant="h6" sx={{ margin: '0' }}>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary" sx={{ margin: '0' }}>
      {description}
    </Typography>
    <Typography variant='h6' align='right' style={{ fontWeight: 'bold', color: 'orange', margin: '0' }}>
      ongoing
    </Typography>
  </CardContent>
</Card>





  );
};

export default TaskCard;
