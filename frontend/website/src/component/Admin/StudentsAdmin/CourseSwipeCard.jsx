import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";

import SwipeCard from './SwipeCard'
import { useContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from '../../../Context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import hold from "../../../../public/Swipehold.png"
export default function CourseSwipeCard({openTable,search}) {
  const {user}=useContext(UserContext)
  const [courses, setCourse]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const currentCourses=useMemo(()=>{
    return courses?.filter((course)=>{
      return search?course.title.toLowerCase().includes(search.toLowerCase()):true;
    })
  },[search,courses])
  const getCourses=async(orgId)=>{
    if(!orgId){
      return null;
    }
    try{
      setLoading(true);
      // Use the new statistics endpoint to get course data with completion rates
      const {data} = await axios.get(`http://localhost:4545/enrollments/statistics/${orgId}`, {
        headers:{
          token:localStorage.getItem("token"),
        }
      })
      
      // Use the courses array from the statistics response
      setCourse(data.stats.courses || []);
    }catch(error){
      setError(error);
      toast.error(error.response?.data?.message || "Error fetching courses")
    }finally{
      setTimeout(() => setLoading(false), 500);
    }
  }
  useEffect(()=>{
    getCourses(user?.orgId);
  },[user?.orgId])
  return (
    
    <Grid container spacing={2}  sx={{margin:"auto",width:"92%"}}>
      {!loading && currentCourses?currentCourses.map((course,index)=>{
        return <SwipeCard course={course} openTable={openTable} key={index} /> 
      }):
      <Box sx={{width:"100%",paddingTop:"",display:"flex",alignItems:"center",justifyContent:"center",height:`${loading?"400px":""}`}}>{loading?<CircularProgress size={"100px"}/>:<img style={{width:"50%"}} src={hold}/>}</Box>
      }
     
    </Grid>
  )
}
