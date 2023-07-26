// import React, { useDebugValue, useEffect, useState } from "react";
// import TaskCard from "../../customItems/TaskCard";
// import { useLocation } from "react-router-dom";
// import axios from '../../../../Axios'
// import { useSelector } from "react-redux";
// import { Typography, Grid, Paper } from "@mui/material";
// import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import MemberModal from "./MemberModal";

// const theme = createTheme();

// const Container = styled(Grid)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   marginBottom: theme.spacing(4),
//   minHeight: "calc(100vh - 80px)",
// }));

// const Column = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   background: theme.palette.background.default,
//   borderRadius: theme.spacing(1),
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   fontWeight: "bold",
// }));

// function TaskHandling() {
//   const [tasks, setTasks] = useState([]);
//   const [projectId, setProjectId] = useState("");
//   const [groupProjectData, setGroupProjectData] = useState({});
//   const location = useLocation();
//   const userData = useSelector((state) => state.userReducer.user);
//   const [taskCount,setTaskCount] = useState(0)
//   const [memberTask,setMemberTask] = useState([])

//   const getProjectData = () => {
//     const Id = new URLSearchParams(location.search).get("id");
//     console.log(Id + " project Id");
//     setProjectId(Id);
//      axios
//       .post(
//         "/user/project/indivitual",
//         { projectId: Id },
//         { headers: { "x-access-token": localStorage.getItem("token") } }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(`${res.data.message}`);
//           console.log(res.data.projectData);
//           setGroupProjectData(res.data.projectData);
//           setTasks(res.data.projectData.tasks);
//         }
//       })
//       .catch((error) => {});
//   };
//   // handle modal 
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState({});

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };
  
//   const handleCardClick = (task) => {
//     setSelectedTask(task);
//     setModalOpen(true);
//   };
//   const getMemberTaskData = () => {
//     let taskCount = 0;
//     let tasksOfMember = [];

    
  
    
//     // Loop through the tasks array in the project data
//     groupProjectData.tasks?.forEach((task) => {
//       // Check if the task has any members assigned to it
//       if (task.members && task.members.length > 0) {
//         // Check if the specific member's email exists in the task's members array
//         const isMemberInTask = task.members.some((m) => m.email === userData.email);
//         if (isMemberInTask) {
//           tasksOfMember.push(task);
//           console.log(task + "  task");
//           console.log("it is in count");
//           taskCount++;
//         }
//       }
//     });
    
//     setTaskCount(taskCount);
//     setMemberTask(tasksOfMember);
//   };
  
    
//     const handleDragEnd = (result) => {
//     const { source, destination } = result;

//     if (!destination) {
//       return;
//     }

//     if (
//       destination.droppableId === source.droppableId &&
//       destination.index === source.index
//     ) {
//       return;
//     }

//     const updatedTasks = [...tasks];
//     const movedTask = { ...updatedTasks[source.index] };

//     if (destination.droppableId === "completed") {
//       movedTask.status = "completed";
//     } else if (destination.droppableId === "ongoing") {
//       movedTask.status = "ongoing";
//     } else if (destination.droppableId === "to-do") {
//       movedTask.status = "to-do";
//     }

//     updatedTasks.splice(source.index, 1);
//     updatedTasks.splice(destination.index, 0, movedTask);

//     setTasks(updatedTasks);
//      axios.patch('/user/project/indivitual/task/statuschange',{taskData:updatedTasks,projectId},     { headers: { "x-access-token": localStorage.getItem("token") } }).then((res)=>{
//       if(res.status===200){
//         console.log(res.data.message);
//         console.log(res.data.projectData +"  project Data")
//         setGroupProjectData(res.data.projectData)
//       }
//     })
//     .catch((error)=>{
//       console.log(error.response.data.message)
//     })
//   };

//   useEffect(() => {
//     getProjectData();
//   }, []);
//   useEffect(()=>{
//      console.log(memberTask)
//   },[memberTask])

//   useEffect(() => {
//     console.log(tasks + " tasks after drag");
//     getMemberTaskData()
//   }, [groupProjectData]);

//   return (
//     <ThemeProvider theme={theme}>
//       <Typography variant="h4" mt={3}>{groupProjectData ? groupProjectData.projectname : ""}</Typography>
//      <h1>{taskCount}</h1>
//      <h1>{memberTask.length}</h1>
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <Container container spacing={2}>
//           <Grid item xs={4}>
//             <Column>
//               <Title variant="h6">To-Do</Title>
//               <Droppable droppableId="to-do">
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     {memberTask.map((task, index) => {
//                       if (task.status !== "to-do") {
//                         return null;
//                       }

//                       return (
//                         <Draggable
//                           key={task._id}
//                           draggableId={task._id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               onClick={() => handleCardClick(task)}
//                             >
//                               <TaskCard
//                                 title={task.taskname}
//                                 description={task.description}
//                               />
//                             </div>
//                           )}
//                         </Draggable>
//                       );
//                     })}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Column>
//           </Grid>
//           <Grid item xs={4}>
//             <Column>
//               <Title variant="h6">Ongoing</Title>
//               <Droppable droppableId="ongoing">
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     {memberTask.filter((task) => task.status === "ongoing").map(
//                       (task, index) => (
//                         <Draggable
//                           key={task._id}
//                           draggableId={task._id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               onClick={() => handleCardClick(task)}
//                             >
//                               <TaskCard
//                                 title={task.taskname}
//                                 description={task.description}
//                               />
//                             </div>
//                           )}
//                         </Draggable>
//                       )
//                     )}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Column>
//           </Grid>
//           <Grid item xs={4}>
//             <Column>
//               <Title variant="h6">Completed</Title>
//               <Droppable droppableId="completed">
//                 {(provided) => (
//                   <div ref={provided.innerRef} {...provided.droppableProps}>
//                     {memberTask.filter((task) => task.status === "completed").map(
//                       (task, index) => (
//                         <Draggable
//                           key={task._id}
//                           draggableId={task._id}
//                           index={index}
//                         >
//                           {(provided) => (
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.draggableProps}
//                               {...provided.dragHandleProps}
//                               onClick={() => handleCardClick(task)}
//                             >
//                               <TaskCard
//                                 title={task.taskname}
//                                 description={task.description}
//                               />
//                             </div>
//                           )}
//                         </Draggable>
//                       )
//                     )}
//                     {provided.placeholder}
//                   </div>
//                 )}
//               </Droppable>
//             </Column>
//           </Grid>
//         </Container>
//       </DragDropContext>
//       <MemberModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         taskData={selectedTask}
//         projectId ={projectId}
//       />
//     </ThemeProvider>
//   );
// }

// export default TaskHandling


// import React, { useEffect, useState } from "react";
// import TaskCard from "../../customItems/TaskCard";
// import { useLocation } from "react-router-dom";
// import axios from '../../../../Axios';
// import { useSelector } from "react-redux";
// import { Typography, Grid, Paper } from "@mui/material";
// import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
// import MemberModal from "./MemberModal";

// const theme = createTheme();

// const Container = styled(Grid)(({ theme }) => ({
//   marginTop: theme.spacing(4),
//   marginBottom: theme.spacing(4),
//   minHeight: "calc(100vh - 80px)",
// }));

// const Column = styled(Paper)(({ theme }) => ({
//   padding: theme.spacing(2),
//   background: theme.palette.background.default,
//   borderRadius: theme.spacing(1),
// }));

// const Title = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   fontWeight: "bold",
// }));

// function TaskHandling() {
//   const [tasks, setTasks] = useState([]);
//   const [projectId, setProjectId] = useState("");
//   const [groupProjectData, setGroupProjectData] = useState({});
//   const location = useLocation();
//   const userData = useSelector((state) => state.userReducer.user);
//   const [taskCount, setTaskCount] = useState(0);
//   const [memberTask, setMemberTask] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [selectedTask, setSelectedTask] = useState({});

//   const getProjectData = () => {
//     const Id = new URLSearchParams(location.search).get("id");
//     console.log(Id + " project Id");
//     setProjectId(Id);
//     axios
//       .post(
//         "/user/project/indivitual",
//         { projectId: Id },
//         { headers: { "x-access-token": localStorage.getItem("token") } }
//       )
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(`${res.data.message}`);
//           console.log(res.data.projectData);
//           setGroupProjectData(res.data.projectData);
//           setTasks(res.data.projectData.tasks);
//         }
//       })
//       .catch((error) => {});
//   };

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

//   const handleCardClick = (task) => {
//     setSelectedTask(task);
//     setModalOpen(true);
//   };

//   const getMemberTaskData = () => {
//     let taskCount = 0;
//     let tasksOfMember = [];

//     groupProjectData.tasks?.forEach((task) => {
//       if (task.members && task.members.length > 0) {
//         const isMemberInTask = task.members.some((m) => m.email === userData.email);
//         if (isMemberInTask) {
//           tasksOfMember.push(task);
//           console.log(task + "  task");
//           console.log("it is in count");
//           taskCount++;
//         }
//       }
//     });

//     setTaskCount(taskCount);
//     setMemberTask(tasksOfMember);
//   };

//   useEffect(() => {
//     getProjectData();
//   }, []);

//   useEffect(() => {
//     console.log(memberTask);
//   }, [memberTask]);

//   useEffect(() => {
//     console.log(tasks + " tasks after drag");
//     getMemberTaskData();
//   }, [groupProjectData]);

//   return (
//     <ThemeProvider theme={theme}>
//       <Typography variant="h4" mt={3}>
//         {groupProjectData ? groupProjectData.projectname : ""}
//       </Typography>
//       <h1>{taskCount}</h1>
//       <h1>{memberTask.length}</h1>
//       <Container container spacing={2}>
//         <Grid item xs={4}>
//           <Column>
//             <Title variant="h6">To-Do</Title>
//             <div>
//               {memberTask.map((task, index) => {
//                 if (task.status !== "to-do") {
//                   return null;
//                 }
//                 return (
//                   <div key={task._id} onClick={() => handleCardClick(task)}>
//                     <TaskCard title={task.taskname} description={task.description} />
//                   </div>
//                 );
//               })}
//             </div>
//           </Column>
//         </Grid>
//         <Grid item xs={4}>
//           <Column>
//             <Title variant="h6">Ongoing</Title>
//             <div>
//               {memberTask
//                 .filter((task) => task.status === "ongoing")
//                 .map((task, index) => (
//                   <div key={task._id} onClick={() => handleCardClick(task)}>
//                     <TaskCard title={task.taskname} description={task.description} />
//                   </div>
//                 ))}
//             </div>
//           </Column>
//         </Grid>
//         <Grid item xs={4}>
//           <Column>
//             <Title variant="h6">Completed</Title>
//             <div>
//               {memberTask
//                 .filter((task) => task.status === "completed")
//                 .map((task, index) => (
//                   <div key={task._id} onClick={() => handleCardClick(task)}>
//                     <TaskCard title={task.taskname} description={task.description} />
//                   </div>
//                 ))}
//             </div>
//           </Column>
//         </Grid>
//       </Container>
//       <MemberModal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         taskData={selectedTask}
//         projectId={projectId}
//       />
//     </ThemeProvider>
//   );
// }

// export default TaskHandling;


import React, { useEffect, useState } from "react";
import TaskCard from "../../customItems/TaskCard";
import { useLocation } from "react-router-dom";
import axios from '../../../../Axios';
import { useSelector } from "react-redux";
import { Typography, Grid, Paper } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import MemberModal from "./MemberModal";

const theme = createTheme();

const Container = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  minHeight: "calc(100vh - 80px)",
}));

const Column = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: theme.palette.background.default,
  borderRadius: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: "bold",
}));

function TaskHandling() {
  const [tasks, setTasks] = useState([]);
    const [projectId, setProjectId] = useState("");
    const [groupProjectData, setGroupProjectData] = useState({});
    const location = useLocation();
    const userData = useSelector((state) => state.userReducer.user);
    const [taskCount, setTaskCount] = useState(0);
    const [memberTask, setMemberTask] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState({});
  
    const getProjectData = () => {
      const Id = new URLSearchParams(location.search).get("id");
      console.log(Id + " project Id");
      setProjectId(Id);
      axios
        .post(
          "/user/project/indivitual",
          { projectId: Id },
          { headers: { "x-access-token": localStorage.getItem("token") } }
        )
        .then((res) => {
          if (res.status === 200) {
            console.log(`${res.data.message}`);
            console.log(res.data.projectData);
            setGroupProjectData(res.data.projectData);
            setTasks(res.data.projectData.tasks);
          }
        })
        .catch((error) => {});
    };
  
    const handleModalOpen = () => {
      setModalOpen(true);
    };
  
    const handleModalClose = () => {
      setModalOpen(false);
    };
  
    const handleCardClick = (task) => {
      setSelectedTask(task);
      setModalOpen(true);
    };
  
    const getMemberTaskData = () => {
      let taskCount = 0;
      let tasksOfMember = [];
  
      groupProjectData.tasks?.forEach((task) => {
        if (task.members && task.members.length > 0) {
          const isMemberInTask = task.members.some((m) => m.email === userData.email);
          if (isMemberInTask) {
            tasksOfMember.push(task);
            console.log(task + "  task");
            console.log("it is in count");
            taskCount++;
          }
        }
      });
  
      setTaskCount(taskCount);
      setMemberTask(tasksOfMember);
    };
  
    useEffect(() => {
      getProjectData();
    }, []);
  
    useEffect(() => {
      console.log(memberTask);
    }, [memberTask]);
  
    useEffect(() => {
      console.log(tasks + " tasks after drag");
      getMemberTaskData();
    }, [groupProjectData]);
  // ... (all the existing code remains the same) ...

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" mt={3}>
        {groupProjectData ? groupProjectData.projectname : ""}
      </Typography>
      <h1>{taskCount}</h1>
      <h1>{memberTask.length}</h1>
      <Container container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Column>
            <Title variant="h6">To-Do</Title>
            <div>
              {memberTask.map((task, index) => {
                if (task.status !== "to-do") {
                  return null;
                }
                return (
                  <div key={task._id} onClick={() => handleCardClick(task)}>
                    <TaskCard title={task.taskname} description={task.description} />
                  </div>
                );
              })}
            </div>
          </Column>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Column>
            <Title variant="h6">Ongoing</Title>
            <div>
              {memberTask
                .filter((task) => task.status === "ongoing")
                .map((task, index) => (
                  <div key={task._id} onClick={() => handleCardClick(task)}>
                    <TaskCard title={task.taskname} description={task.description} />
                  </div>
                ))}
            </div>
          </Column>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Column>
            <Title variant="h6">Completed</Title>
            <div>
              {memberTask
                .filter((task) => task.status === "completed")
                .map((task, index) => (
                  <div key={task._id} onClick={() => handleCardClick(task)}>
                    <TaskCard title={task.taskname} description={task.description} status={'ongoing'} />
                  </div>
                ))}
            </div>
          </Column>
        </Grid>
      </Container>
      <MemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        taskData={selectedTask}
        projectId={projectId}
      />
    </ThemeProvider>
  );
}

export default TaskHandling;


