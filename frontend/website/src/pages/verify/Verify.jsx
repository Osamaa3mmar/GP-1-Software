import { Backdrop, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";

export default function Verify() {
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    const {id}=useParams();
    console.log(id);
    const navigate=useNavigate();
    const sendVerify=async()=>{
        try{
            const {data}=await axios.put('http://localhost:4545/auth/email/send/verify',{id});
            console.log(data);
            Swal.fire({
              title: data.message,
              icon: "success",
              draggable: true
            });            navigate('/auth/login');
        }catch(e){
            setError(e.response.data.message);
             Swal.fire({
                          title:e.response.data.message,
                          icon: "error",
                          draggable: true
                        });
            console.log("dfd")
        }
        finally{
            setLoading(false);
        }
    }



    useEffect(()=>{
        sendVerify();
    },[])
    if(loading){
        return( <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
            
          >
            <CircularProgress color="inherit" />
          </Backdrop>)
    }
  return (
   <>
   {error}
   </>
  )
}
