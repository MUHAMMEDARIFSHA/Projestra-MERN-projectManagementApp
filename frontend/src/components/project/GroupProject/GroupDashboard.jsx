import React, { useEffect, useState } from "react";
import axios from "../../../Axios";
import { FcBusinessman, FcFlowChart, FcComboChart } from "react-icons/fc";
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
function GroupDashboard() {
  const [projectId, setProjectId] = useState("");
  const [groupProjectData, setGroupProjectData] = useState({});
  let totalmembers
  const getProjectData = async () => {
    const Id = new URLSearchParams(location.search).get("id");
    console.log(Id + " project Id");
    setProjectId(Id);
    await axios
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
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getProjectData();
  }, []);

  //  random data
  const project = {
    name: "Project Name",
    description: "Project Description",
    totalMembers: 10,
    totalTasks: 25,
    completionPercentage: 60,
  };

  // Dummy data for the members table
  const members = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    // Add more member data objects as needed
  ];
  return (
    <div>
      {/* <h1>hi this is group dashboard</h1>
      <h1>{groupProjectData.projectname}</h1> */}
      <Container maxWidth="xl">
        <Box my={4} textAlign="start">
          <Typography variant="h3" color="primary" gutterBottom>
            {groupProjectData.projectname}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {groupProjectData.description}
          </Typography>
        </Box>

        <Box my={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Grid display="flex" alignItems="center" justifyContent="space-around">
                    <Grid item>
                      <FcBusinessman  size={"50px"} />
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
                  <Grid display="flex" alignItems="center" justifyContent="space-around">
                    <Grid item >
                      <FcFlowChart  size={"50px"} />
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
                  <Grid display="flex" alignItems="center" justifyContent="space-around">
                    <Grid item >
                    <FcComboChart size={"50px"} />
                    </Grid>
                    <Grid item> 
                      <Typography variant="h6">Completed</Typography>
                      <Typography variant="h4">
                      {project.completionPercentage}%
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            {/* Add one more card here */}
          </Grid>
        </Box>

        <Box my={4}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  {/* Add more table headers as needed */}
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    {/* Add more table cells with member details as needed */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}

export default GroupDashboard;
