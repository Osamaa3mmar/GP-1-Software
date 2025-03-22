import { Box, Stack } from "@mui/material";
import Header from "./Header";

export default function AddCourseForm({close}) {
  return (
    <Box sx={{position:"absolute",display:"flex",bgcolor:"red",alignItems:"center",justifyContent:"center",borderRadius:"15px",overflow:"hidden",width:"70%"}}>
      <Stack sx={{width:"100%"}} direction={"column"} spacing={2}>
      <Header close={close}/>
      </Stack>
    </Box>
  )
}
