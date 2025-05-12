import { Box, CircularProgress, Typography } from '@mui/material';
import Grid from "@mui/material/Grid2";

import SwipeCard from './SwipeCard'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../Context/UserContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import hold from "../../../../public/Swipehold.png"
export default function CourseSwipeCard({openTable}) {
  const {user}=useContext(UserContext)
  const [courses, setCourse]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const getCourses=async(orgId)=>{
    if(!orgId){
      return null;
    }
    try{
      setLoading(true);
      const {data}=await axios.get(`http://localhost:4545/enrollments/all/courses/${orgId}`,{
        headers:{
          token:localStorage.getItem("token"),
        }
      })
      setCourse(data.courses);
    }catch(error){
      setError(error);
      toast.error(error.response.data.message)
    }finally{
      setTimeout(() => setLoading(false), 500);
    }
  }
  useEffect(()=>{
    getCourses(user?.orgId);
  },[user?.orgId])
  return (
    
    <Grid container spacing={2}  sx={{margin:"auto",width:"92%"}}>
      {!loading && courses?courses.map((course,index)=>{
        return <SwipeCard course={course} openTable={openTable} key={index} /> 
      }):
      <Box sx={{width:"100%",paddingTop:"",display:"flex",alignItems:"center",justifyContent:"center",height:`${loading?"400px":""}`}}>{loading?<CircularProgress size={"100px"}/>:<img style={{width:"50%"}} src={hold}/>}</Box>
      }
     
    </Grid>
  )
}
