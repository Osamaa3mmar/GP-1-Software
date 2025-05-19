import { Stack } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify";
import AssignCourseCard from "./AssignCourseCard";
import { UserContext } from "../../Context/UserContext";

export default function AssignedToCourse({userId,reload}) {
    const [courses, setCourses] = useState([]);
    const {user}=useContext(UserContext);
    const getAllCoursesNotHaveTeacher = async () => {
        try{
            const {data}=await axios.get("http://localhost:4545/course/getallnotassigninorg/"+user?.orgId,{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
            console.log(data);
            setCourses(data.courses);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
    const assign=async(courseId)=>{
        try{
            const {data}=await axios.post("http://localhost:4545/applye/assign/instructor",{
                userId,
                courseId
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            reload();
            getAllCoursesNotHaveTeacher();
            toast.success(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        getAllCoursesNotHaveTeacher();
    },[user])
  return (
    <Stack sx={{height:"500px",overflow:"auto"}} spacing={0}>
        <div>
      {courses?.map((item)=>{
        return <AssignCourseCard  assign={assign} reload={getAllCoursesNotHaveTeacher} {...item} userId={userId} key={item.id}/>
      })}
      </div>
    </Stack>
  )
}
