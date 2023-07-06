import {React,useEffect, useState} from 'react';
import { Container, Grid, Typography, Card, CardContent ,Box,Button} from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from "../../Axios"
import Navbar from '../user/Navbar';

const projects = [
  { id: 1, title: 'Individual Project 1', type: 'Individual' },
  { id: 2, title: 'Individual Project 2', type: 'Individual' },
  { id: 3, title: 'Group Project 1', type: 'Group' },
  { id: 4, title: 'Group Project 2', type: 'Group' },
];

function ProjectsListing() {
  const [projectsData,setProjectsData] = useState([])
  const navigate = useNavigate()
  const toCreateProject = ()=>{
   navigate('/user/createproject')
  }
  const toHandleProject = ()=>{
    console.log("to project");
  }
  const getProjects = ()=>{
console.log("get projects");
axios.get('/user/projectlist',{ headers: { 'x-access-token': localStorage.getItem('token')} }).then((res)=>{
  if(res.status===200){
    console.log(`${res.data.message}`)
    console.log(res.data.projects)
    setProjectsData(res.data.projects)
  }
})
  .catch((error)=>{
  console.log(error.response.data.message)
  })}
  useEffect(()=>{
   getProjects()
  },[])
  return (
<div style={{background: 'linear-gradient(to right, #007BFF, #00BFA5)', height: "100vh"}}>

      <Navbar/>
      <Container >
      <Grid container marginTop="70px"spacing={2}>
        <Grid item xs={12} md={6}>
           <PersonIcon sx={{color:"#999999" ,fontSize: '60px'}}/>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Individual Projects
          </Typography>
          {projectsData.length?projectsData.filter((project) => project.type === 'Indivitual')
            .map((project) => (
              <Card key={project._id} sx={{ my: 2 }}>
                <Box onClick={toHandleProject} sx={{cursor:"pointer"}}>
                <CardContent >
                  <Typography variant="h5">{project.projectname}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {project.status}
                  </Typography>
                </CardContent>
                </Box>
              </Card>
            )) :""}
        </Grid>
        <Grid item xs={12} md={6}>
          <Groups3Icon sx={{color:"#999999" ,fontSize: '60px'}}/>
          <Typography variant="h4" sx={{ my: 2 }}>
            Group Projects
          </Typography>
          {projectsData.length?projectsData
            .filter((project) => project.type === 'Group')
            .map((project) => (
              <Card key={project.id} sx={{ mt: 2 }}>
                <Box onClick={toHandleProject} sx={{cursor:"pointer"}}>
                <CardContent>
                  <Typography variant="h5">{project.projectname}</Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                   {project.description}
                  </Typography>
                </CardContent>
                </Box>
              </Card>
            )):""}
        </Grid>
        <Button
             onClick={toCreateProject}
                fullWidth
                variant="contained"
                sx={{
                  my: 7,
                  borderRadius: "3px",
                  height: "40px",
                  fontWeight: "700",
                  backgroundColor: "green",
                }}
              >
                Create New Project
              </Button>
      </Grid>
    </Container>

    </div>
  )
}

export default ProjectsListing
