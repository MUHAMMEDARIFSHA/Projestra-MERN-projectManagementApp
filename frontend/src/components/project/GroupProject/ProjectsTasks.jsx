import React from "react";
import GroupSideBar from "./GroupSideBar";
import { Box, Grid, Button } from "@mui/material";
function ProjectsTasks() {
  const handleAddTask = () => {
    console.log("add task");
  };
  return (
    <>
      <Box display="flex">
        <GroupSideBar />
        <Box flex="1" ml={3}>
          <Grid container>
            <Grid item xs={12}>
              <h1>tasks</h1>
              <Grid item alignContent='center' xs={11}>
                <Button
                  onClick={handleAddTask}
                  fullWidth
                  variant="contained"
                  sx={{
                    ml: 2,
                    borderRadius: "3px",
                    height: "50px",
                    fontWeight: "700",
                    backgroundColor: "green",
                  }}
                >
                  Add Task
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default ProjectsTasks;
