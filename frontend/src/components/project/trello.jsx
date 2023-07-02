import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import {
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { styled, ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
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

const CardForTask = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: theme.palette.background.paper,
  borderRadius: theme.spacing(1),
}));

const initialTasks = {
  todo: [],
  ongoing: [],
  completed: [],
};

const TrelloClone = () => {
  const [tasks, setTasks] = useState(initialTasks);
  
  


  const handleDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const updatedTasks = [...tasks[source.droppableId]];
      const [removed] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId]: updatedTasks,
      });
    } else {
      const sourceTasks = [...tasks[source.droppableId]];
      const destTasks = [...tasks[destination.droppableId]];
      const [removed] = sourceTasks.splice(source.index, 1);
      destTasks.splice(destination.index, 0, removed);

      setTasks({
        ...tasks,
        [source.droppableId]: sourceTasks,
        [destination.droppableId]: destTasks,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Container container spacing={2}>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">To-Do</Title>
              <Droppable droppableId="todo">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.todo.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <CardForTask
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </CardForTask>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Column>
            <TaskModal/>
          </Grid>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">Ongoing</Title>
              {/* <Droppable droppableId="ongoing">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.ongoing.map((task, index) => (
                      <CardForTask key={task.id}>{task.content}</CardForTask>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable> */}
              <TaskCard title="Task" description=" Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica"  />       
               </Column>
          </Grid>
          <Grid item xs={4}>
            <Column>
              <Title variant="h6">Completed</Title>
              <Droppable droppableId="completed">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.completed.map((task, index) => (
                      <CardForTask key={task.id}>{task.content}</CardForTask>
                    ))}
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

export default TrelloClone;
