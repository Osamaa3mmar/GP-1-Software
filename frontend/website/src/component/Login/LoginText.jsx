import { Box, Typography } from '@mui/material'

export default function LoginText() {
  return (
    <Box sx={{textAlign: "center", verticalAlign: "center",}}>
        <Typography variant='h4' component={'h2'}>Log in </Typography>
        <Typography variant='body' component={'body'}>Enter your credentials to access your account</Typography>
    </Box>
  )
}
