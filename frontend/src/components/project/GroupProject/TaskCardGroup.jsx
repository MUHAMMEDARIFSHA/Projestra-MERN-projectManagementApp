// import React from "react";
// import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
// import AvatarGroup from '@mui/material/AvatarGroup';

// const TaskCardGroup = ({ tasks,users }) => {
//   // Assuming you have the task data with name, description, and assigned members' data
// const openDataModal = ()=>{
//     console.log("it is data modal");
// }
//   return (
//     <Box my={2} >
//     {tasks.map((task) => (
//       <Card onClick={openDataModal} key={task.id} sx={{ width: "100%", display: "flex", justifyContent: "space-between", my: 2 }}>
//         <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
//           <Typography variant="h5"  marginBottom={1}>
//             {task.taskname}
//           </Typography>
//           <Typography>
//             {task.description}
//           </Typography>
//         </CardContent>
//         <Box sx={{ display: "flex", alignItems: "center", paddingRight: 2 }}>
//           <AvatarGroup>
//             {task.members.map((member) => {
//               const user = users.find((user) => user.email === member.email);
//               if (user) {
//                 return <Avatar key={user.id} alt={user.usernamename} src={user.profilePicture} />;
//               }
//               // You can handle the case when a user is not found or provide a default avatar here.
//               return null;
//             })}
//           </AvatarGroup>
//         </Box>
//       </Card>
//     ))}
//   </Box>
  
//   );
// };

// export default TaskCardGroup;

import React, { useState } from "react";
import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import AvatarGroup from '@mui/material/AvatarGroup';

const TaskCardGroup = ({ tasks, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const openDataModal = (task) => {
    console.log("on data modal open");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeDataModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box my={2}>
      {tasks.map((task) => (
        <Card onClick={() => openDataModal(task)} key={task.id} sx={{ width: "100%", display: "flex", justifyContent: "space-between", my: 2 }}>
          <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "start" }}>
            <Typography variant="h5" marginBottom={1}>
              {task.taskname}
            </Typography>
            <Typography>
              {task.description}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", paddingRight: 2 }}>
            <AvatarGroup>
              {task.members.map((member) => {
                const user = users.find((user) => user.email === member.email);
                if (user) {
                  return <Avatar key={user.id} alt={user.username} src={user.profilePicture} />;
                }
                // You can handle the case when a user is not found or provide a default avatar here.
                return null;
              })}
            </AvatarGroup>
          </Box>
        </Card>
      ))}
      {/* Render the modal here based on the isModalOpen state */}
      {isModalOpen && selectedTask && (
        <div>
          {/* Your modal component here */}
          <div>
            <Typography variant="h5">{selectedTask.taskname}</Typography>
            <Typography>{selectedTask.description}</Typography>
            {/* Render other task details here */}
            {/* Add a button to close the modal */}
            <button onClick={closeDataModal}>Close Modal</button>
          </div>
        </div>
      )}
    </Box>
  );
};

export default TaskCardGroup;

