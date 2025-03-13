import { ArrowBack, Email } from '@mui/icons-material'
import { Box, Button, Card, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { SignupContext } from '../SignupContext'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function EmailForm({setStep}) {
    const {email,id}=useContext(SignupContext);
    const{handleSubmit}=useForm();
    const navigate=useNavigate();
    
    const submit=async()=>{
        try{
            const {data}=await axios.put('http://localhost:4545/auth/email/send/confirm',{id});
            console.log(data);
            navigate('/auth/login')
        }catch(error){
            console.log(error);
        }
    }
  return (
    <form action="" onSubmit={handleSubmit(submit)}>
   <Box
   sx={{
     
     transition: "opacity 0.3s ease-in-out",
     textAlign: "center",
     py: 2,
   }}
 >
   <Box
     sx={{
       width: 80,
       height: 80,
       borderRadius: "50%",
       bgcolor: "primary.light",
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       mx: "auto",
       mb: 3,
     }}
   >
     <Email sx={{ fontSize: 40, color: "white" }} />
   </Box>
   <Typography variant="h5" component="h2" gutterBottom>
     Verify your email
   </Typography>
   <Typography variant="body1" sx={{ mb: 4, maxWidth: 400, mx: "auto" }}>
     We need to verify your email address to complete the registration process and secure your account.
   </Typography>

   <Card variant="outlined" sx={{ mb: 4, p: 3, textAlign: "left", borderRadius: 2 }}>
     <Typography variant="subtitle2" color="text.secondary" gutterBottom>
       Email address
     </Typography>
     <Typography variant="body1" fontWeight={500}>
       {email}
     </Typography>
   </Card>

   <Box sx={{ display: "flex", gap: 2 }}>
     <Button variant="outlined" sx={{ flex: 1 }} onClick={()=>setStep(1)} startIcon={<ArrowBack />}>
       Back
     </Button>
     <Button variant="contained" sx={{ flex: 1 }} type='submit' startIcon={<Email />}>
       Send Verification Email
     </Button>
   </Box>
 </Box>
 </form>
  )
}
