import React, { useEffect, useState } from "react";
import axios from "../../../Axios";
import { useNavigate } from "react-router-dom";
import { FcBusinessman, FcFlowChart, FcComboChart } from "react-icons/fc";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
function GroupDashboard() {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [groupProjectData, setGroupProjectData] = useState({});
  const [buttonText, setButtonText] = useState("");
  const [buttonColor, setButtonColor] = useState("");

  const [buttonValue, setButtonValue] = useState("");

  const getProjectData = () => {
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    setProjectId(Id);
    axios
      .post(
        "/user/project/group",
        { projectId: Id },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(`${res.data.message}`);
          console.log(res.data.projectData);
          setGroupProjectData(res.data.projectData);
          //   setTasks(res.data.projectData.tasks);

          const initialButtonText =
            res.data.projectData.status === "incomplete"
              ? "Complete"
              : "Incomplete";
          const initialButtonColor =
            res.data.projectData.status === "incomplete" ? "green" : "red";
          const initialButtonValue =
            res.data.projectData.status === "incomplete"
              ? "complete"
              : "incomplete";
          setButtonText(initialButtonText);
          setButtonColor(initialButtonColor);
          setButtonValue(initialButtonValue);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getProjectData();
  }, []);
  useEffect(() => {}, [groupProjectData]);

  const handleChange = () => {};

  const deleteProject = (id) => {
    console.log("delete peoject with id => ", id);

    axios
      .post(
        "/user/group/project/delete",
        { projectId: id },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log("project deleted");
          navigate("/user/projects");
        }
      });
  };
  const projectStatusChange = (buttonValue) => {
    console.log(buttonValue);
    axios
      .post(
        "/user/group/project/changestatus",
        { status: buttonValue, projectId },
        { headers: { "x-access-token": localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data.message);
          console.log(res.data.projectData);
          setGroupProjectData(res.data.projectData);
          const initialButtonText =
            res.data.projectData.status === "incomplete"
              ? "Complete"
              : "Incomplete";
          const initialButtonColor =
            res.data.projectData.status === "incomplete" ? "green" : "red";
          const initialButtonValue =
            res.data.projectData.status === "incomplete"
              ? "complete"
              : "incomplete";
          setButtonText(initialButtonText);
          setButtonColor(initialButtonColor);
          setButtonValue(initialButtonValue);
        }
      });
  };
  //  random data
  const project = {
    name: "Project Name",
    description: "Project Description",
    totalMembers: 10,
    totalTasks: 25,
    completionPercentage: 60,
  };

  // Dummy data for the members table
  return (
    <div>
      {/* <h1>hi this is group dashboard</h1>
      <h1>{groupProjectData.projectname}</h1> */}
      <Container maxWidth="xl">
        <Box my={4} textAlign="start">
          <Typography variant="h3" color="primary" gutterBottom>
            {groupProjectData.projectname}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {groupProjectData.description}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Status :: {groupProjectData.status}
          </Typography>
        </Box>

        <Box my={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <FcBusinessman size={"50px"} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Total Members</Typography>
                      <Typography variant="h4">
                        {groupProjectData?.members?.length || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <FcFlowChart size={"50px"} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Total Tasks</Typography>
                      <Typography variant="h4">
                        {groupProjectData?.tasks?.length || 0}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Grid
                    display="flex"
                    alignItems="center"
                    justifyContent="space-around"
                  >
                    <Grid item>
                      <FcFlowChart size={"50px"} />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Completed</Typography>
                      <Typography variant="h4">
                      {Math.round((((groupProjectData?.tasks?.filter(task => task.status === 'completed').length)/(groupProjectData?.tasks?.length))*100)  )||0 } %
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

         

            {/* Add one more card here */}

            <Grid item xs={12} sm={6} md={12}>
              <Grid item m={3} xs={6} md={6}>
                <TextField
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    groupProjectData.start_date
                      ? new Date(groupProjectData.start_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                
                  label="startdate"
                  name="start_date"
                  fullWidth
                />
              </Grid>

              <Grid item m={3} xs={6} md={6}>
                <TextField
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={
                    groupProjectData.end_date
                      ? new Date(groupProjectData.end_date)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  
                  label="startdate"
                  name="start_date"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid
              container
              xs={4}
              md={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <Box m={1} borderRadius="20px" bgcolor={"#FFA500"}>
                <Button
                  onClick={() => {
                    deleteProject(groupProjectData._id);
                  }}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    boxShadow: "none",
                  }}
                  style={{ borderRadius: "5px", backgroundColor: "red" }}
                  variant="contained"
                  disableElevation
                >
                  Delete
                </Button>
              </Box>

              <Box m={1} borderRadius="20px" bgcolor={"#00C853"}>
                <Button
                  onClick={() => {
                    projectStatusChange(buttonValue);
                  }}
                  sx={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    padding: "8px 16px",
                    boxShadow: "none",
                  }}
                  style={{
                    borderRadius: "5px",
                    backgroundColor: buttonColor,
                    color: "",
                  }}
                  variant="contained"
                  disableElevation
                  value={buttonValue}
                >
                  {buttonText}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default GroupDashboard;
