import { React, useState } from "react";
import Navbar from "../user/Navbar";
import axios from "../../Axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";

function CreateProject() {
  const [projectData, setProjectData] = useState({});
  const navigate = useNavigate()
  const teamLeadSuggestions = [
    "a",
    "b",
    "c",
    "abc",
    "qwert",
    "arif",
    "arifsha",
    "mdarifsha",
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(projectData);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("create project submit");
    await axios.post(
      "/user/createproject",
      { projectData },
      { headers: { "x-access-token": localStorage.getItem("token") } }
    ).then((res)=>{
  if(res.status ===200){
    console.log(`${res.data.message}`)
    navigate('/user/projects')
  }
    })
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          p: 4,
          background: "linear-gradient(to right , #73a7eb,#adf0d4)",
          marginTop: "60px",
          minHeight: "685px",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            fontWeight="600"
            fontFamily="revert"
            my={4}
            sx={{ color: "success" }}
          >
            Create your project..!
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={8}>
                <TextField
                  label="Project Name"
                  // InputLabelProps={{
                  //   ...(profileData.username
                  //     ? { shrink: true }
                  //     : { shrink: false }),
                  // }}
                  name="projectname"
                  fullWidth
                  variant="outlined"
                  color="success"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  variant="outlined"
                  name="description"
                  // value={profileData.about}
                  multiline
                  rows={4}
                  color="success"
                  // InputLabelProps={{
                  //   ...(profileData.about
                  //     ? { shrink: true }
                  //     : { shrink: false }),
                  // }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="Start Date"
                  name="startdate"
                  type="date"
                  // value={profileData.location}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  color="success"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  label="End Date"
                  name="enddate"
                  type="date"
                  // value={profileData.company}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                  variant="outlined"
                  color="success"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <Select
                  labelId="Select Project Type"
                  fullWidth
                  variant="outlined"
                  color="success"
                  name="type"
                  value={projectData.type || "Individual"}
                  onChange={handleChange}
                >
                  <MenuItem value="Individual">Indivitual Project</MenuItem>
                  <MenuItem value="Group">Group Project </MenuItem>
                </Select>
              </Grid>
              {projectData.type === "Group" ? (
                <Grid item xs={12} sm={6} md={6}>
                  <Autocomplete
                    freeSolo
                    options={teamLeadSuggestions}
                    name="teamlead"
                    value={projectData.teamlead || null}
                    onInputChange={handleChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add Team Lead"
                        name="teamlead"
                        fullWidth
                        variant="outlined"
                        color="success"
                      />
                    )}
                  />
                </Grid>
              ) : (
                ""
              )}

              <Button
                type="submit"
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
                Create Project
              </Button>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CreateProject;
