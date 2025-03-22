import { Backdrop, Modal, Stack } from "@mui/material";
import UserInfo from "../../component/Admin/CoursesAdmin/UserInfo";
import AddCourseButton from "../../component/Admin/CoursesAdmin/AddCourseButton";
import { useState } from "react";
import AddCourseForm from "../../component/Admin/CoursesAdmin/AddCourseFrom/AddCourseForm";
import CourseCardAdmin from "../../component/Admin/CoursesAdmin/Cards/CourseCardAdmin";

export default function CoursesAdmin() {
  const [modal,setModal]=useState(false);
  const closeModal=()=>{setModal(false)}
  const openModal=()=>{setModal(true)}
  return (
    <Stack direction={"column"}sx={{width:"100%",paddingTop:"25px"}} spacing={2}>
      <UserInfo/>
      <AddCourseButton action={openModal}/>
      <CourseCardAdmin/>

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
