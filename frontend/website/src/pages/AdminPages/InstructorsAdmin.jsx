import { Stack } from "@mui/material";
import InstructorsTools from "../../component/Instructors/InstructorsTools";
import InstructorsArea from "../../component/Instructors/InstructorsArea";
import { UserContext } from "../../Context/userContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function InstructorsAdmin() {
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
      <h1>Instructors</h1>
      <InstructorsTools  />
      <InstructorsArea getAll={getInstrutors} instructors={instructors} />
    </Stack>
  )
}
