import { Avatar, Box, Stack } from "@mui/material";
import { useContext } from "react";
import { UserContext } from "../../../Context/UserContext";

export default function UserInfo() {
    const {user}=useContext(UserContext);
  return (
    <Box sx={{padding:"15px 35px",marginTop:"20px",width:"100%",bgcolor:"#d9d9db44",borderRadius:"20px",display:"flex",alignItems:"center",gap:"10px",justifyContent:"end"}}>
        <Avatar alt="Remy Sharp" src={user?user.profilePic:null} />
         <Stack>
            <h2 style={{fontSize:"20px",textTransform:"capitalize",fontWeight:"600"}}>{user?user.username:"none"}</h2>
            <p style={{color:"gray"}}>{user?user.email:"none@gmail.com"}</p>
         </Stack>
    </Box>
  )
}
