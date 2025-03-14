import { Box } from "@mui/material";
import LoginForm from "../../component/Login/LoginForm";

export default function Login() {
  return (
   <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100dvh",bgcolor:"#e9eeff"}}>
    <LoginForm/>
   </Box>
  )
}
