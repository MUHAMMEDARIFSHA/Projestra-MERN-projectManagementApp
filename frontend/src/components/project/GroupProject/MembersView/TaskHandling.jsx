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
    const [memberStatus,setMemberStatus] = useState("")
  
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
            const status = 'status'
            console.log(status +"  status")
          }
        })
        .catch((error) => {});
    
      };

      const handleModalClose = (response) => {
        console.log("response in main page group");
        // Handle the response here in the main page
        console.log(response.projectData);
        console.log("Modal closed with response:", response.message);
        console.log(response.projectData?.tasks);
        setGroupProjectData(response.projectData)
        setTasks(response.projectData.tasks);
        setModalOpen(false);
      };
  
    const handleModalOpen = () => {
      setModalOpen(true);
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
                    <TaskCard title={task.taskname} description={task.description} status={task.members.find((m) => m.email === userData.email).status}   bottomColor={'#FFAF87'}/>
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
                    <TaskCard title={task.taskname} description={task.description} status={task.members.find((m) => m.email === userData.email).status}   bottomColor={'#4CE0B3'} />
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
                    <TaskCard title={task.taskname} description={task.description} status={task.members.find((m) => m.email === userData.email).status}  statusColor={'	#008000'} bottomColor={'	#377771'} />
                  </div>
                ))}
            </div>
          </Column>
        </Grid>
      </Container>
      <MemberModal
        open={modalOpen}
        onClose={handleModalClose}
        taskData={selectedTask}
        projectId={projectId}
        project={groupProjectData}
      />
    </ThemeProvider>
  );
}

export default TaskHandling;


// colors
// #377771
// #4CE0B3
// #FFAF87


