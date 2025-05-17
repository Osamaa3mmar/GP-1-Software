import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

export default function LoginText() {
  return (
    <Box sx={{textAlign: "", verticalAlign: "center",}}>
      <IconButton component={Link} to={"/"}>
      <ArrowBackIcon sx={{fontSize:28}}/>
      </IconButton>
<Typography component="h2" sx={{ marginBottom:2,fontSize: '2.5rem', fontWeight: 'bold' }}>
  Log in
</Typography>
        <Typography variant='body' component={'body'}>Enter your credentials to access your account</Typography>
    </Box>
  )
}
