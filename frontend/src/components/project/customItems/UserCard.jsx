import * as React from 'react';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardActions from '@mui/material/CardActions'; // Correct import path
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import Avatar from '@mui/joy/Avatar';

export default function UserCard({user}) {
  return (
    <Card
      sx={{
        textAlign: 'center',
        alignItems: 'center',
        overflow: 'auto',
        '--icon-size': '100px',
      }}
      style={{ width: '160px' }} // Set the width of the card to 100px
    >
      <CardOverflow variant="solid" color="warning">
        <Avatar sx={{m:'auto',position:'relative',transform: 'translateY(50%)',width:"100px",height:"100px"}}/>
      </CardOverflow>
      <Typography level="h2" fontSize="xl" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
         Congrats Julia 
         {user.username?user.username:""}
      </Typography>
      <CardActions
        orientation="vertical"
        buttonFlex={1}
        sx={{
          '--Button-radius': '40px',
          width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
        }}
      >
         <Button variant="solid" color="warning">
          Remove
        </Button> 
      </CardActions>
    </Card>
  );
}
