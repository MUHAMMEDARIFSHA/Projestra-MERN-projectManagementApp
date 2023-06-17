import React from 'react'
import { Card,CardContent,Typography } from '@mui/material'

const CustomCard = ({title,description,backgroundColor})=> {
  return (
    <Card sx={{ maxWidth: 275, backgroundColor, mt: 8 }}>
      <CardContent>
        <Typography variant="h4" component="div">
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 8, mt: 1.5 ,fontWeight:540 }} color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
    )
}

export default CustomCard
