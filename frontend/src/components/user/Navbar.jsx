import  {React,useState,useEffect} from "react";
import axios from "../../Axios"
import {setUser}  from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { userClearAuth } from "../../features/user/userAuthSlice";
import { useDispatch ,useSelector} from "react-redux";


import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(userClearAuth());
    navigate("/signin");
  };

  const handleProfile = () => {
    navigate('/user/profile')
  };
 const username = useSelector((state) => state.userReducer.user.username);
  const getData = ()=>{
    console.log("get data");
    axios.get('/user/getdata',{ headers: { 'x-access-token': localStorage.getItem('token')} }).then((res)=>{
      if(res.status===200){
        console.log(res.data.user)
        dispatch(setUser(res.data.user))
      }
    
    }).catch((error)=>{
   if(response.error && response.error.status===404){
    console.log(error.response.data.message)
   }
    })
  }

  useEffect(()=>{
   getData()
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        className="navbar"
        sx={{ height: "70px", backgroundColor: "white" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
                display: { xs: "none", md: "flex" },
              }}
              alt="The house from the offer."
              src="/images/logo-projestro.png"
            />
            <Typography
              href="/home"
              component="h3"
              variant="h5"
              color="#245194"
              fontWeight="600"
              sx={{ display: { xs: "none", md: "flex" }, mr: 4 }}
            >
              Projestra
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <Typography key={page} variant="body1">
                    {page}
                  </Typography>
                ))}
                 
              </Menu>
            </Box>
            
            <Box
              component="img"
              sx={{
                height: 60,
                width: 60,
                display: { xs: "flex", md: "none" },
              }}
              alt="The house from the offer."
              src="/images/logo-projestro.png"
            />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontWeight: 600,
                color: "#245194",
                textDecoration: "none",
              }}
            >
              Projestra
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box>
              <Typography color="black">
              hi {username}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                alt="User Avatar"
                src="/path/to/user-avatar.jpg"
                onClick={handleMenuOpen}
                sx={{ cursor: "pointer", marginRight: 1 }}
              />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

export default Navbar;
