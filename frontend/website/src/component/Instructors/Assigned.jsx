import { Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";
import AssignCourseCard from "./AssignCourseCard";

export default function Assigned({userId,reload}) {
    const [courses, setCourses] = useState([]);
    const getCoursesTheacherAssignedTo=async()=>{
        try{
            const {data}=await axios.get("http://localhost:4545/applye/getuser/"+userId);
            console.log(data);
            setCourses(data.user.courses);
            reload();
        }catch(error){
        toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        getCoursesTheacherAssignedTo();
    },[])
  return (
    <Stack sx={{height:"500px",overflow:"auto"}} spacing={0}>
      <div >
      {courses?.map((item)=>{
        return <AssignCourseCard reload={getCoursesTheacherAssignedTo} {...item} userId={userId} key={item.id}/>
      })}
      </div>
    </Stack>
  )
}
