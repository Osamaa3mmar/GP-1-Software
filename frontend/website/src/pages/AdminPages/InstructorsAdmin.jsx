import { Stack } from "@mui/material";
import InstructorsTools from "../../component/Instructors/InstructorsTools";
import InstructorsArea from "../../component/Instructors/InstructorsArea";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";

export default function InstructorsAdmin() {
  const [searchedUser, setSearchedUser] = useState("");
  const [instructors, setInstructors] = useState([]);
  const {user}=useContext(UserContext);
  
  const getInstrutors=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4545/applye/getallaccepted/"+user?.orgId);
      setInstructors(data.accepted);
    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    getInstrutors();
  },[user])
  return (
    <Stack>
      <h1 style={{fontSize:"30px",fontWeight:"600",marginTop:"20px",marginBottom:"10px"}}>Instructors</h1>
      <InstructorsTools reload={getInstrutors}  setSearchedUser={setSearchedUser} />
      <InstructorsArea getAll={getInstrutors} search={searchedUser} instructors={instructors} />

    </Stack>
  )
}
