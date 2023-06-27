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

export default function ProfileCard({ title }) {
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
          ratio="4/3"
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
            opacity: 0,
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
              <Typography level="h1" noWrap sx={{ fontSize: "lg" }}>
                <Link
                  href="#dribbble-shot"
                  overlay
                  underline="none"
                  sx={{
                    color: "black",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                    fontSize:"28px",
                    fontWeight:700

                  }}
                >
                  {title}
                </Link>
              </Typography>
              {/* <IconButton size="sm" color="neutral" sx={{ ml: "auto" }}>
                <CreateNewFolder />
              </IconButton>
              <IconButton size="sm" color="neutral">
                <Favorite />
              </IconButton> */}
            </Box>
            <Box sx={{ px: 2 }}>
              <Typography>
                hi all this is the profile of the user in the profile page. hi
                all this is the profile of the user in the profile page. hi all
                this is the profile of the user in the profile page.
              </Typography>
            </Box>
          </Box>
        </CardCover>
      </Box>
      {/* <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar
          src="https://images.unsplash.com/profile-1502669002421-a8d274ad2897?dpr=2&auto=format&fit=crop&w=32&h=32&q=60&crop=faces&bg=fff"
          size="sm"
          sx={{ '--Avatar-size': '1.5rem' }}
        /> */}
      {/* <Typography sx={{ fontSize: 'sm', fontWeight: 'md' }}>
          National Park
        </Typography> */}
      {/* <Chip
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{
            borderRadius: 'sm',
            py: 0.25,
            px: 0.5,
          }}
        >
          Featured
        </Chip> */}
      {/* <Link
          href="#dribbble-shot"
          level="body3"
          underline="none"
          startDecorator={<Favorite />}
          sx={{
            fontWeight: 'md',
            ml: 'auto',
            color: 'text.secondary',
            '&:hover': { color: 'danger.plainColor' },
          }}
        >
          117
        </Link> */}
      {/* <Link
          href="#dribbble-shot"
          level="body3"
          underline="none"
          startDecorator={<Visibility />}
          sx={{
            fontWeight: 'md',
            color: 'text.secondary',
            '&:hover': { color: 'primary.plainColor' },
          }}
        >
          10.4k
        </Link> */}
      {/* </Box> */}
    </Card>
  );
}
