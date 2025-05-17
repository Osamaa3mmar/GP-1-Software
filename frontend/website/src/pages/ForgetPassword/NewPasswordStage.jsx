import { Box, Button, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import KeyIcon from '@mui/icons-material/Key';
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function NewPasswordStage({setStep,code,email}) {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const navigation=useNavigate();
    const resetPassword=async(info)=>{
        if(info.password!=info.cofirm){
            toast.error("Password and Confirm Password do not match");
            return;
        }
        try{
                const {data}=await axios.post("http://localhost:4545/auth/reset",{
                code:code,
                password:info.password,
                email:email
            });
                toast.success(data.message);
                navigation("/auth/login");
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  return (
    <Box sx={{ width: '100%' }}>
       <form onSubmit={handleSubmit(resetPassword)}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
    <label
      htmlFor="password"
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#555',
        lineHeight: '1.5',
        marginBottom: '0px',
      }}
    >
        New Password
    </label>
    <Box
      sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid #ccc',
          background: 'white',
          borderRadius: 1,
          px: 1.5,
          py: 1,
          transition: 'outline 0.3s ease',
          "&:focus-within": {
              outline: '1px solid #654dbf',
              '& svg': {
                  color: '#654dbf',
                },
            },
        }}
    >
        <KeyIcon sx={{ color: 'gray', mr: 1 }} />
      <InputBase
        type="password"
       {...register('password', {
  required: 'Password is required',
    })}

        id="password"
        sx={{ flex: 1 }}
        fullWidth
        placeholder="Enter New Password"
        autoComplete="off"
        autoFocus
        inputProps={{ 'aria-label': 'Password' }}
      />
    </Box>

    {/* Move the error message here */}
    {errors.password && (
      <p style={{ color: 'red', margin: 0 }}>{errors.password.message}</p>
    )}


 <label
      htmlFor="cofirm"
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#555',
        lineHeight: '1.5',
        marginBottom: '0px',
      }}
    >
        Cofirm New Password
    </label>
    <Box
      sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: '1px solid #ccc',
          background: 'white',
          borderRadius: 1,
          px: 1.5,
          py: 1,
          transition: 'outline 0.3s ease',
          "&:focus-within": {
              outline: '1px solid #654dbf',
              '& svg': {
                  color: '#654dbf',
                },
            },
        }}
    >
      <InputBase
        type="password"
       {...register('cofirm', {
  required: 'Cofirm Password is required',
    })}

        id="cofirm"
        sx={{ flex: 1 }}
        fullWidth
        placeholder="Cofirm New Password"
        autoComplete="off"
        autoFocus
        inputProps={{ 'aria-label': 'Cofirm Password' }}
      />
    </Box>

    {/* Move the error message here */}
    {errors.cofirm && (
      <p style={{ color: 'red', margin: 0 }}>{errors.cofirm.message}</p>
    )}

<label
      htmlFor="email"
      style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#555',
        lineHeight: '1.5',
        marginBottom: '0px',
      }}
    >
        Verification Code
    </label>

    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: '1px solid #ccc',
        background: 'white',
        borderRadius: 1,
        px: 1.5,
        py: 1,
        transition: 'outline 0.3s ease',
        "&:focus-within": {
          outline: '1px solid #654dbf',
          '& svg': {
            color: '#654dbf',
          },
        },
      }}
    >
      <InputBase
      disabled
      value={code}
        type="code"
       {...register('code', {
  required: 'Code is required',
  minLength: {
    value: 6,
    message: 'Code must be 6 characters long',
  },
  maxLength: {
    value: 6,
    message: 'Code must be 6 characters long',
  },
  pattern: {
    message: 'Enter a 6-Letter code',
  },
    })}

        id="code"
        sx={{ flex: 1 }}
        fullWidth
        placeholder="Enter Verify Code"
        autoComplete="off"
        autoFocus
        inputProps={{ 'aria-label': 'email address' }}
      />
    </Box>

    {/* Move the error message here */}
    {errors.code && (
      <p style={{ color: 'red', margin: 0 }}>{errors.code.message}</p>
    )}


    <Button
     sx={{
      
        padding:"10px 20px",
        marginTop:"20px",
        borderRadius:"13px",
        
    }}
    type="submit" variant="contained" endIcon={<ArrowForwardIcon/>}>
      Send Code
    </Button>
     <Button 
      sx={{
      
        padding:"10px 20px",
        borderRadius:"13px",
        
    }}
     onClick={()=>{setStep(1)}} variant="outlined" endIcon={<ArrowBackIcon />}>
      Back
    </Button>
  </Box>
</form>

    </Box>
  )
}
