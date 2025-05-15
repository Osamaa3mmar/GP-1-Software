import { Box, Button, CircularProgress, Stack } from "@mui/material"
import Profile from "../../component/Admin/HomeAdmin/Profile"
import Description from "../../component/Admin/HomeAdmin/Description"
import Tabs from "../../component/Admin/HomeAdmin/Tabs"
import { Backdrop, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Header from "../../component/Admin/CoursesAdmin/AddCourseFrom/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
import { OrgNotificationsContext } from "../../Context/NotificationsOrgContext";
import { useLocation, useParams } from "react-router-dom";

export default function HomeAdmin() {
    const [modal,setModal]=useState(false);
    const [title,setTitle]=useState('');
    const [content,setContent]=useState('');
    const [org,setOrg]=useState(null);
    const [loading,setLoading]=useState(true);
    const [error,setError]=useState(null);
    const [onSave,setOnSave]=useState(null);
    const [edit,setEdit]=useState(false);
    const {user}=useContext(UserContext);
  const getOrgInfo=async(orgId)=>{
    try{
      console.log("here")
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const {data}=await axios.get(`http://localhost:4545/org/getorg/${orgId}`);
      setOrg(data.org);
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      setError(error);
    }finally{
      setLoading(false);
    }
  }



  const closeModal=()=>{
    setModal(false);
  }
  const {id}=useParams();
  useEffect(()=>{
    if(!id){
if (user?.orgId) {
        getOrgInfo(user?.orgId);
        setEdit(true);
      }
    }else{
        getOrgInfo(id);

    }
      
    
  },[user])
  return (
    <Stack>
      {error?<div>errro</div>:loading?
      <Box sx={{display:"flex",alignItems:"center",justifyContent:"center",width:"100%",paddingTop:"150px",height:"500px"}}><CircularProgress size="150px" /></Box>
      :
      <>
      <Profile edit={edit}  setOrg={setOrg} save={setOnSave} name={org?.name} profile={org?.profile} background={org?.backGroundImage} setModal={setModal} setTitle={setTitle} setContent={setContent}/>
      <Description edit={edit} setOrg={setOrg} save={setOnSave} description={org?.description} setModal={setModal} setTitle={setTitle} setContent={setContent}/>
      <Tabs/>
      </>
      
      }
     
      <Modal
        open={modal}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 700,
          },
        }}
        sx={{display:"flex",alignItems: "center",justifyContent: "center"}}
      >
        <Box sx={{position:"absolute",display:"flex",bgcolor:"white",alignItems:"center",justifyContent:"center",borderRadius:"15px",overflow:"hidden",width:"70%"}}>
      <Stack sx={{width:"100%"}} direction={"column"} spacing={2}>
      <Header close={closeModal} title={title}/>
      <Box sx={{padding:"20px"}}>
      {content}
      
      </Box>
      </Stack>
      <Box>
      
    </Box>
    </Box>
    
      </Modal>
    </Stack>
  )
}
