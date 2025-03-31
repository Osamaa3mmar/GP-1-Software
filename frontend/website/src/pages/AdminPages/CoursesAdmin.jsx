import { Backdrop, Modal, Stack } from "@mui/material";
import UserInfo from "../../component/Admin/CoursesAdmin/UserInfo";
import AddCourseButton from "../../component/Admin/CoursesAdmin/AddCourseButton";
import { useEffect, useState } from "react";
import AddCourseForm from "../../component/Admin/CoursesAdmin/AddCourseFrom/AddCourseForm";
import CourseCardAdmin from "../../component/Admin/CoursesAdmin/Cards/CourseCardAdmin";
import axios from "axios";
import { toast } from "react-toastify";

export default function CoursesAdmin() {
  const [modal,setModal]=useState(false);
  const [courses,setCourses]=useState()
  const [loading,setLoading]=useState(true);
  const closeModal=()=>{setModal(false)}
  const openModal=()=>{setModal(true)}
  const getCourses=async()=>{
    try{
      const {data}=await axios.get('http://localhost:4545/course/owner/courses',{headers:{
        token:localStorage.getItem('token')
      }})
      toast.success("heyyy");
      console.log(data)
      setCourses(data.org.courses);
    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    getCourses();
  },[])
  return (
    <Stack direction={"column"}sx={{width:"100%",padding:"25px 0px"}} spacing={2}>
      <UserInfo/>
      <AddCourseButton action={openModal}/>
      <CourseCardAdmin courses={courses} />
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={{display:"flex",alignItems: "center",justifyContent: "center"}}
      >
        <AddCourseForm close={closeModal}/>
      </Modal>
    </Stack>
  )
}
