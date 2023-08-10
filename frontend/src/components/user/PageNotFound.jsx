import React from "react";

import { Button, Typography, Container } from '@mui/material';
function PageNotFound() {
  return (
    <>
    <h1>404</h1>
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Button  variant="contained" color="primary">
        Go Home
      </Button>
    </Container>
    </>
  );
}

export default PageNotFound;
