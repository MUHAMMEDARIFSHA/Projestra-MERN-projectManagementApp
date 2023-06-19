import React from "react";
import { useDispatch } from "react-redux";
import { adminClearAuth } from "../../features/adminAuth/adminSlice";

import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import { useNavigate } from "react-router-dom";


const drawerWidth = 220;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    marginTop: "73px",
    
    backgroundColor: "#D9D9D9", // Set the background color
  },
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  cursor: "pointer",
 
  "&:hover": {
    backgroundColor: "#ADACAC", // Set the hover background color
  },
}));

const CustomListItemText = styled(ListItemText)(({ theme }) => ({
    
  color: "#ffffff", // Set the text color
}));

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleUserNavigate = () => {
    navigate('/admin/users');
  };
  const handleLogout=()=>{
    localStorage.removeItem("adminToken");
    dispatch(adminClearAuth())
    navigate("/admin/signin")
  }

  return (
    <StyledDrawer variant="permanent" anchor="left">
      <List>
        <CustomListItem>
          <ListItemIcon>
            <SpaceDashboardIcon />
          </ListItemIcon>
          <CustomListItemText primary="Dashboard" />
        </CustomListItem>
        <CustomListItem onClick={handleUserNavigate}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <CustomListItemText primary="Users" />
        </CustomListItem>
        <CustomListItem>
          <ListItemIcon>
            <AccountTreeIcon />
          </ListItemIcon>
          <CustomListItemText primary="Projects" />
        </CustomListItem>
        <CustomListItem onClick={handleLogout} >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <CustomListItemText primary="Logout" />
        </CustomListItem>
      </List>
    </StyledDrawer>
  );
}
