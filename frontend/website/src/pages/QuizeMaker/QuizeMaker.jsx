import { SpeedDial, Stack, Tooltip } from "@mui/material";
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import QustionCardMaker from "../../component/Qustion/QustionCardMaker";
import axios from "axios";
import { toast } from "react-toastify";
export default function QuizeMaker() {
const [qustions, setQustiones] = useState([]);

const makeEmptyQustion=()=>{
    const newQustion={
        order:qustions.length+1,
        questionText:"",
        options:[],
        correctAnswer:'',
        marks:0,
        explanation:'',
        type:'mcq'
    }
    setQustiones([...qustions,newQustion]);
}
const getAllQustion=async(name)=>{
  try{
    const {data}=await axios.get("http://localhost:4545/qustion/getall/1",{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    if(name=="delete"){
       toast.info("Qustion Deleted !", {
              position: "bottom-left",
            });
    }
    console.log(data);
    setQustiones(data.qustions);
  }catch(error){
    console.log(error);
  }
}
  useEffect(()=>{
    getAllQustion();
  },[]);
  return (
    <>
    <Stack spacing={4} sx={{background:"#f9faff"}}>
     {qustions?.length>0?
     qustions.map((qustion,index)=>{
        return <QustionCardMaker index={index} reload={getAllQustion}  key={qustion.id || index} {...qustion}/>
     })
     
     :"No qustion yet"}




    </Stack>






    <Tooltip title="Create qustion">
     <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClick={makeEmptyQustion}
      >
      </SpeedDial> 
      </Tooltip>
    </>
  )
}
