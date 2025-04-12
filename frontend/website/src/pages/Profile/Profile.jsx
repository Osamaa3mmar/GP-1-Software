import Grid from "@mui/material/Grid2";

import LeftComponent from "../../component/Profile/LeftComponent/LeftComponent";
import RightComponent from "../../component/Profile/RightComponent/RightComponent";
import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user,setUser]=useState(null);

const getUser=async ()=>{
  try{
    const {data}=await axios.get("",{
      headers:{
        token:localStorage.getItem("token")
      }
    })
    
  }catch(e){
    console.log(e)
  }
}



  useEffect(()=>{
    getUser();
  },[])
  return (
    <Container maxWidth={"lg"}>
    <Grid container  sx={{paddingY:"40px"}} >
      <Grid size={{lg:6,md:10,sm:12,xs:12}}>
      <LeftComponent/>
      </Grid>
      <Grid size={{lg:6,md:10,sm:12,xs:12}}>
      <RightComponent/>
      </Grid>
    </Grid>
    </Container>
  )
}
