import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import { Grid } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function ProfileCard({ title ,children}) {
  return (
    <Card
      sx={{
        margin: 5,
        width: 300,
        bgcolor: "initial",
        boxShadow: "none",
        "--Card-padding": "0px",
        backdropFilter: " blur(10rem)",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <AspectRatio
          ratio="16/6"
          sx={{ color: "linear-gradient(to right ,#B3D4FF,#A0C0E9)" }}
        >
          <figure>
            <img
              src="https://images.unsplash.com/photo-1546994603-f6a61d99a3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80"
              srcSet="https://images.unsplash.com/photo-1546994603-f6a61d99a3bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2231&q=80"
              loading="lazy"
              alt="Yosemite by Casey Horner"
            />
          </figure>
        </AspectRatio>
        <CardCover
          className="gradient-cover"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
            },
            opacity: 0.2,
            transition: "0.1s ease-in",
            background:
              "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
          }}
        >
          {/* The first box acts as a container that inherits style from the CardCover */}
          <Box display="flex" flexDirection="column">
            <Box
              sx={{
                px: 2,
                display: "flex",
                textAlign: "left",
             
              }}
            >
              <Typography level="h1" noWrap sx={{ fontSize: "xxl" }}>
                <Link
                 
                  overlay
                  underline="none"
                  sx={{
                    background:"linear-gradient( to right 135deg,#79F2C0, #2684FF)",
                    color:"linear-gradient( to right, #79F2C0, #2684FF)" ,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                    fontSize:"38px",
                    fontWeight:700

                  }}
                >
                  {title}
                </Link>
             
              </Typography>
              <IconButton size="sm"  sx={{ ml:1 }}>
              {children}
              </IconButton>
             
            </Box>
            
          </Box>
        </CardCover>
      </Box>
    </Card>
  );
}
