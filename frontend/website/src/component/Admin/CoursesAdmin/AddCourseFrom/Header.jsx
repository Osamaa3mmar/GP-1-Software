import { Box, IconButton } from "@mui/material";
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
export default function Header({close}) {
  return (
    <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",bgcolor:"#f1f4ff",padding:'10px 15px'}}>
      <h2 style={{fontWeight:"600"}}>Add Course</h2>
      <IconButton onClick={close}><HighlightOffOutlinedIcon/></IconButton>
    </Box>
  )
}
