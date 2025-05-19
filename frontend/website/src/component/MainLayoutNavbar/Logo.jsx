import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import logo from '../../../public/logo.png'
export default function Logo() {
  const theme = useTheme();
  return (
    <Stack sx={{ alignItems: "center" }} direction={"row"} spacing={1}>
      
      <Box sx={{borderRadius:"6px",width:"60px",height:"60px",overflow:"hidden"}}> <img  src={logo} style={{scale:"1.5"}} alt="" /></Box>
    
    <Typography
      variant=""
      color="primary"
      sx={{ fontSize: "34px", fontWeight: "700" }}
    >
      Thuraa
    </Typography>
     
  </Stack>
  )
}
