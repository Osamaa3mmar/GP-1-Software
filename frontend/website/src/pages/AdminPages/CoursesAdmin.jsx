import { Backdrop, Modal, Stack } from "@mui/material";
import UserInfo from "../../component/Admin/CoursesAdmin/UserInfo";
import AddCourseButton from "../../component/Admin/CoursesAdmin/AddCourseButton";
import { useEffect, useMemo, useState } from "react";
import AddCourseForm from "../../component/Admin/CoursesAdmin/AddCourseFrom/AddCourseForm";
import axios from "axios";
import { toast } from "react-toastify";
import CoursesArea from "../../component/Admin/CoursesAdmin/Cards/CoursesArea";
import { set } from "react-hook-form";
import EditCourseForm from "../../component/Admin/CoursesAdmin/EditCourseForm/EditCourseForm";

export default function CoursesAdmin({id}) {
  const [modal,setModal]=useState(false);
  const [courses,setCourses]=useState(null);
  const [search,setSearch]=useState('');
  const [currentCourse,setCurrentCourse]=useState(null);
  const [fromNoti,setFromNoti]=useState(null);
  const closeModal=()=>{
    setModal(false);
    setCurrentCourse(null);
  }
  const openModal=()=>{
    setModal(true);
    
  }
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
    
    if(id&&courses&&!fromNoti){
      setFromNoti(courses.filter((item)=>{
        return item.id==id;
      })[0].title);
      return courses?.filter((item)=>{
        return item.id==id;
      })
    }
    
    if(courses)
    return courses.filter((item)=>{
      return item.title.toLowerCase().includes(search.toLowerCase())||item.price<=search ||item.id==search;
    })
    return [];
  },[search,courses]);
  useEffect(()=>{
    getCourses();
  },[])
  return (
    <Stack direction={"column"}sx={{width:"100%",padding:"25px 0px"}} spacing={2}>
      <UserInfo noti={fromNoti?id:''} search={setSearch}/>
      <AddCourseButton action={openModal}/>
      <CoursesArea setCourses={getCourses} setCurrentCourse={setCurrentCourse} openModal={openModal}courses={currentCourses} />
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
        {currentCourse?<EditCourseForm title={"Edit Course Info"} reload={getCourses} course={currentCourse} close={closeModal}/>:<AddCourseForm  title={"Add Course"} getCorses={getCourses}  close={closeModal}/>}
      </Modal>
    </Stack>
  )
}
