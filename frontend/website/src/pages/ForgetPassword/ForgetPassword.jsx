import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import EmailStage from "../../component/ForgetPassword/EmailStage";
import NewPasswordStage from "./NewPasswordStage";
import CodeStage from "../../component/ForgetPassword/CodeStage";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";

export default function ForgetPassword() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    
  return (
   <Box 
   sx={{
    backgroundColor:"#e9eeff",
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:'100vh',
    borderRadius:'10px',
    padding:'20px',
}}>
    <Box 
    sx={{
        boxShadow:'0 4px 8px rgba(0,0,0,0.1)',
        display:'flex',
        flexDirection:'column',
        justifyContent:'start',
        alignItems:'start',
        width:'600px',
        padding:'34px',
        backgroundColor:'#fff',
        borderRadius:'15px',
        border:"2px solid #e4e4e7"
    }}>
        <IconButton component={Link} to={"/auth/login"}>
            <ArrowBackIcon sx={{fontSize:28}}/>
        </IconButton>
    <Typography 
    variant="h5"
    sx={{
        fontWeight:'900',
        marginBottom:'8px',
        color:'black',
        fontSize:'30px',
        }}>
        Reset Your Password

    </Typography>
    <Typography 
    variant="body1"
    sx={{
        marginBottom:'40px',
        color:'#555',
        textAlign:'center',
        fontSize:'16px',
        lineHeight:'1',
        }}>
        Enter your email to receive a verification code
    </Typography>

    {step==0?
    <EmailStage email={email} setEmail={setEmail} setStep={setStep}/>:
    step===1?
    <CodeStage  setStep={setStep} setCode={setCode}/>:
    <NewPasswordStage email={email} code={code} setStep={setStep}/>}
    </Box>
   </Box>
  )
}
