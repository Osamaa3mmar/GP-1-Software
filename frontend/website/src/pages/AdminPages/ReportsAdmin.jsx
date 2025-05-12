import { Box } from "@mui/material";
import ReportCard from "../../component/Admin/Reports/ReportCard";
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
export default function ReportsAdmin() {
  return (
    <Box sx={{display:"flex",gap:"20px",alignItems:"center",height:"100dvh",width:"100%",justifyContent:"space-around",flexWrap:"wrap"}}>
      <ReportCard title={"Start Analysis"} icon={<AssessmentIcon sx={{fontSize:"100px"}}/>}/>
      <ReportCard title={"Certificates"} icon={<WorkspacePremiumIcon sx={{fontSize:"100px"}}/>}/>
    </Box>
  )
}
