import React, { useEffect, useState } from "react";
import TaskCard from "../customItems/TaskCard";
import TaskModal from "../customItems/TaskModal";
import { useLocation } from "react-router-dom";
import axios from "../../../Axios";
import { Typography, Grid, Paper } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

const ProjectDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState("");
  const [projectData, setProjectData] = useState({});
  const location = useLocation();

  const getProjectData = async () => {
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    setProjectId(Id);
    await axios
      .post(
        "/user/project/indivitual",
        { projectId: Id },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(`${res.data.message}`);
          console.log(res.data.projectData);
          setProjectData(res.data.projectData);
          setTasks(res.data.projectData.tasks);
        }
      })
      .catch((error) => {});
  };

  const handleModalClose = (response) => {
    console.log("response");
    // Handle the response here in the main page
    console.log(response.projectData);
    console.log("Modal closed with response:", response.message);
    console.log(response.projectData.tasks);
    setTasks(response.projectData.tasks);
  };

  const handleDragEnd = async(result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedTasks = [...tasks];
    const movedTask = { ...updatedTasks[source.index] };

    if (destination.droppableId === "completed") {
      movedTask.status = "completed";
    } else if (destination.droppableId === "ongoing") {
      movedTask.status = "ongoing";
    } else if (destination.droppableId === "to-do") {
      movedTask.status = "to-do";
    }

    updatedTasks.splice(source.index, 1);
    updatedTasks.splice(destination.index, 0, movedTask);

    setTasks(updatedTasks);
    await axios.patch('/user/project/indivitual/task/statuschange',{taskData:updatedTasks,projectId},     { headers: { "x-access-token": localStorage.getItem("token") } }).then((res)=>{
      if(res.status===200){
        console.log(res.data.message);
        console.log(res.data.projectData +"  project Data")
        setProjectData(res.data.projectData)
      }
    })
    .catch((error)=>{
      console.log(error.response.data.message)
    })
  };

  useEffect(() => {
    getProjectData();
  }, []);

  useEffect(() => {
    console.log(tasks + " tasks after drag");
  }, [tasks]);

  return (
    <ThemeProvider theme={theme}>
      <Typography variant="h4" mt={3}>{projectData ? projectData.projectname : ""}</Typography>
     
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container container spacing={2}>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">To-Do</Title>
              <Droppable droppableId="to-do">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.map((task, index) => {
                      if (task.status !== "to-do") {
                        return null;
                      }

                      return (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                title={task.taskname}
                                description={task.description}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <TaskModal
                id={projectId ? projectId : ""}
                onClose={handleModalClose}
              />
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">Ongoing</Title>
              <Droppable droppableId="ongoing">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.filter((task) => task.status === "ongoing").map(
                      (task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                title={task.taskname}
                                description={task.description}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Column>
          </Grid>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">Completed</Title>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.filter((task) => task.status === "completed").map(
                      (task, index) => (
                        <Draggable
                          key={task._id}
                          draggableId={task._id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard
                                title={task.taskname}
                                description={task.description}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Column>
          </Grid>
        </Container>
      </DragDropContext>
    </ThemeProvider>
  );
};

export default ProjectDashboard;
