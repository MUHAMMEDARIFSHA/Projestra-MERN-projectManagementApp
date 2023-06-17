import React from 'react'
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

function AdminNavbar() {
   
    
    
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          className="navbar"
          sx={{ height: "70px", backgroundColor: "white"}}
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
                href="/"
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
                 
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
               
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                 
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
            
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
  )
}

export default AdminNavbar
