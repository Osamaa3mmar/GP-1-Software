import { Box, Button, CircularProgress, Stack } from "@mui/material";
import Tools from "../../component/Admin/StudentsAdmin/Tools";
import { useEffect, useState } from "react";
import UsersTable from "../../component/Admin/StudentsAdmin/UsersTable";
import CourseSwipeCard from "../../component/Admin/StudentsAdmin/CourseSwipeCard";

export default function StudentsAdmin() {
  const [search,setSearch]=useState('');
  const [showTable,setShowTable]=useState(false);
  const [currentCourse,setCurrentCourse]=useState(null);
  const [loading,setLoading]=useState(true);
  
  
  const open=(id)=>{
    setShowTable(true);
    setCurrentCourse(id);
  }

  const dellay=async()=>{
    await new Promise((resolve)=> setTimeout(resolve,400))
    setLoading(false);
  }

  useEffect(()=>{
    dellay();
  },[])
  return (
    <Stack direction={"column"} gap={5} sx={{paddingY:'26px',width:"100%" ,marginX:"auto"}}>
      <Tools setSearchTerm={setSearch}/>
      
      {
      showTable?
      <Box sx={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"flex-start"}}>
        
        <Button onClick={()=>{setShowTable(false)}} sx={{marginLeft:"14px"}}>Close Selection</Button>
      
      <UsersTable courseId={currentCourse}/>
      </Box>:<Box>
      <CourseSwipeCard openTable={open}/>
        
      </Box>
}
     
      
      
    </Stack>
  )
}
