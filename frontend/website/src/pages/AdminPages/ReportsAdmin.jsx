import { Box, Stack } from "@mui/material";
import ReportCard from "../../component/Admin/Reports/ReportCard";
import AssessmentIcon from '@mui/icons-material/Assessment';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ToolsReports from "../../component/Reports/ToolsReports";
import { useState } from "react";
export default function ReportsAdmin() {
  const [current,setCurrent]=useState("Certificates")
  return (
    <Stack >
      <ToolsReports setPage={setCurrent}/>
      {/* {current?<Certificates/>:<CourseAnalysis/>} */}
    </Stack>
  )
}
