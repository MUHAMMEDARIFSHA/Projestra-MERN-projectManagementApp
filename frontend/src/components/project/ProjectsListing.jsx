import {React,useEffect, useState} from 'react';
import { Container, Grid, Typography, Card, CardContent ,Box,Button} from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import axios from "../../Axios"
import Navbar from '../user/Navbar';


function ProjectsListing() {
  const [projectsData,setProjectsData] = useState([])
  const [memberProject,setMemberProject] = useState([])
  const navigate = useNavigate()
  const toCreateProject = ()=>{
   navigate('/user/createproject')
  }
  const toHandleProject = (id)=>{
    console.log("to project");
    console.log(id +"id of project")
     navigate(`/user/indivitualproject?id=${id}`)
  }
  const toHandleGroupProject = (id)=>{
    console.log('to group project')
    console.log(id +" id of group project")
    navigate(`/user/groupproject?id=${id}`)
  }
  const toHandleMemberProject = (id)=>{
    console.log('to group project member view')
    console.log(id +" id of group project member")
    navigate(`/user/groupproject/member?id=${id}`)
  }
  const getProjects = ()=>{
console.log("get projects");
axios.get('/user/projectlist',{ headers: { 'x-access-token': localStorage.getItem('token')} }).then((res)=>{
  if(res.status===200){
    console.log(`${res.data.message}`)
    console.log(res.data.projects)
    setProjectsData(res.data.projects)
    setMemberProject(res.data.memberProjects)
  }
})
  .catch((error)=>{
  console.log(error.response.data.message)
  })}
  useEffect(()=>{
   getProjects()
  },[])
  return (
<div style={{background: 'linear-gradient(to right, #007BFF, #00BFA5)'}}>

      <Navbar/>
      <Container >
      <Grid container marginTop="60px"spacing={2}>
        <Grid item xs={12} md={4}>
           <PersonIcon sx={{color:"#999999" ,fontSize: '60px'}}/>
          <Typography variant="h4" sx={{ mt: 2 }}>
            Individual Projects
          </Typography>
          {projectsData.length?projectsData.filter((project) => project.type === 'Indivitual')
            .map((project) => (
              <Card key={project._id} sx={{ my: 2 }}>
                <Box onClick={()=>{toHandleProject(project._id)}} sx={{cursor:"pointer"}}>
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
        <Grid item xs={12} md={4}>
          <Groups3Icon sx={{color:"#999999" ,fontSize: '60px'}}/>
          <Typography variant="h4" sx={{ my: 2 }}>
            Group Projects
          </Typography>
          {projectsData.length?projectsData
            .filter((project) => project.type === 'Group')
            .map((project) => (
              <Card key={project.id} sx={{ mt: 2 }}>
                <Box onClick={()=>{toHandleGroupProject(project._id)}} sx={{cursor:"pointer"}}>
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
        <Grid item xs={12} md={4}>
          <Groups3Icon sx={{color:"#999999" ,fontSize: '60px'}}/>
          <Typography variant="h4" sx={{ my: 2 }}>
            Member Projects
          </Typography>
          {memberProject.length?memberProject
            // .filter((project) => project.type === 'Group')
            .map((project) => (
              <Card key={project.id} sx={{ mt: 2 }}>
                <Box onClick={()=>{toHandleMemberProject(project._id)}} sx={{cursor:"pointer"}}>
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
