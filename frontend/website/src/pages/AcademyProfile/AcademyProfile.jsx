import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import HomeAdmin from "../AdminPages/HomeAdmin";
import { Button, Chip, Tooltip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function AcademyProfile() {
  const {user}=useContext(UserContext);
  const [isInIt,setIsInIt]=useState(false);
  const {id}=useParams();
  const applay=async()=>{
    try{
      const {data}=await axios.post("http://localhost:4545/applye/makeapplay",{
        userId:user?.id,
        orgId:user?.orgId,
      },{
        headers:{
          token:localStorage.getItem("token"),
        }
      })
      toast.success(data.message);
    }catch(error){
      toast.error(error.response.data.message);
    }
  }

const checkIsInIt=async()=>{
  try{
    const {data}=await axios.post("http://localhost:4545/applye/checkisinit",{
      orgId:id,
    },{
      headers:{
        token:localStorage.getItem("token"),
      }
    })
    console.log("isin");
    if(data.isInIt){
      setIsInIt(true);
    }
  }catch(error){
    console.log(error);
  }
}

  useEffect(()=>{
    if(user?.role=="tech"){
      checkIsInIt();
    }
  },[user])
  return (
    <div style={{position:"relative",width:"90%",margin:"auto"}}>
      {user?.role=="tech"?isInIt? <Chip sx={{position:"absolute",top:400,left:0}} color="primary" icon={<CheckIcon />} label="You Are Instructor In This Academy" variant="filled" />:<Tooltip sx={{position:"absolute",top:400,left:0}} title={"Send Resume"} placement="top" arrow>
      <Button onClick={applay} variant="contained" color="primary" >
        Want to be an instructor?
      </Button>
      </Tooltip>:"" }
      <HomeAdmin/>
    </div>
  )
}
