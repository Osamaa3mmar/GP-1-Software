import { Box, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
export default function AddCourseButton({action}) {
  return (
    <Box sx={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
      <h2 style={{fontWeight:"500" ,fontSize:"24px"}}>Courses</h2>

      <Button onClick={action} startIcon={<AddIcon/>} variant="contained" sx={{bgcolor:"primary.main",padding:"10px 16px",borderRadius:"10px"}}>Add Course</Button>
    </Box>
  )
}
