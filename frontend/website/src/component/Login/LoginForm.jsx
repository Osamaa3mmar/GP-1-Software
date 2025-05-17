import LoginText from './LoginText'
import Form from './Form'
import {  Box, Chip, Container, createTheme, Divider, Stack, ThemeProvider, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function LoginForm() {
    const theme=createTheme({
        palette:{
            primary: {
                main:"#5752e9",
                dark:"#4f46e5"
            }
        }
    })
  return (
  <ThemeProvider theme={theme}>
  <Container maxWidth={"sm"}>
    <Stack spacing={4} sx={{bgcolor:"white",boxShadow:"0px 0px 10px rgba(0,0,0,0.3)",padding:"30px 40px",borderRadius:"20px"}}>
      <LoginText/>
      <Form/>
      <Stack spacing={2}>
      <Divider>
        <Chip label={"OR"} sx={{bgcolor:"primary.dark", color:"white"
        }}/>
      </Divider>
      <Box  sx={{display: "flex",alignItems: "center",justifyContent: "center"}}>
      <Typography variant='body'>
      Dont have an account? <Link style={{color:"#5752e990",textDecoration:"underline",marginLeft:'4px'}} to={'/auth/signup'}>Sign up</Link>
      </Typography>
      </Box>
      </Stack>
      </Stack>
      </Container>
      </ThemeProvider>
  )
}
