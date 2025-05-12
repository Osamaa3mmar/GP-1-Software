import { Backdrop, Modal, Stack } from "@mui/material";
import UserInfo from "../../component/Admin/CoursesAdmin/UserInfo";
import AddCourseButton from "../../component/Admin/CoursesAdmin/AddCourseButton";
import { useEffect, useMemo, useState } from "react";
import AddCourseForm from "../../component/Admin/CoursesAdmin/AddCourseFrom/AddCourseForm";
import axios from "axios";
import { toast } from "react-toastify";
import CoursesArea from "../../component/Admin/CoursesAdmin/Cards/CoursesArea";

export default function CoursesAdmin() {
  const [modal,setModal]=useState(false);
  const [courses,setCourses]=useState(null);
  const [search,setSearch]=useState('');
  const closeModal=()=>{
    setModal(false);
  }
  const openModal=()=>{setModal(true)}

  const getCourses=async()=>{
    try{
      const {data}=await axios.get('http://localhost:4545/course/owner/courses',{headers:{
        token:localStorage.getItem('token')
      }})
      setCourses(data.courses);
      
    }catch(error){
      toast.error("Failed to get courses"+error.message);
    }
  }
  const currentCourses=useMemo(()=>{
    if(courses)
    return courses.filter((item)=>{
      return item.title.toLowerCase().includes(search.toLowerCase())||item.price<=search;
    })
    return [];
  },[search,courses]);
  useEffect(()=>{
    getCourses();
  },[])
  return (
    <Stack direction={"column"}sx={{width:"100%",padding:"25px 0px"}} spacing={2}>
      <UserInfo search={setSearch}/>
      <AddCourseButton action={openModal}/>
      <CoursesArea setCourses={getCourses}   courses={currentCourses} />
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
        <AddCourseForm  getCorses={getCourses}  close={closeModal}/>
      </Modal>
    </Stack>
  )
}
