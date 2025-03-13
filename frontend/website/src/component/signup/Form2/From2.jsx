import { Box } from "@mui/material";
import Text from "./Text";
import RoleForm from "./RoleForm";

export default function From2({setStep}) {
  return (
   <Box sx={{display:"flex",flexDirection:"column"}}>
    <Text/>
    <RoleForm setStep={setStep}/>

   </Box>
  )
}
