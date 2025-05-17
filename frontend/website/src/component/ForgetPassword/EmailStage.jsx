import { Box, Button, InputBase } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function EmailStage({setStep,setEmail}) {
    const {register,handleSubmit,formState:{errors}}=useForm();
    const sendEmail=async(info)=>{
        try{
            const {data}=await axios.post("http://localhost:4545/auth/forget",{
                email:info.email
            });
            toast.success(data.message);
            setStep(1);
            setEmail(info.email);
        }catch(error){
            console.log(error);
        }
    }
  return (
    <Box sx={{ width: '100%' }}>
       <form onSubmit={handleSubmit(sendEmail)}>
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
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
      Email Address
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
      <EmailIcon sx={{ color: 'gray', mr: 1 }} />
      <InputBase
        type="email"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Enter a valid email address',
          },
        })}
        id="email"
        sx={{ flex: 1 }}
        fullWidth
        placeholder="Enter your email"
        inputProps={{ 'aria-label': 'email address' }}
      />
    </Box>

    {/* Move the error message here */}
    {errors.email && (
      <p style={{ color: 'red', margin: 0 }}>{errors.email.message}</p>
    )}

    <Button
    sx={{
      
        padding:"10px 20px",
        marginTop:"20px",
        borderRadius:"13px",
        
    }}
      fullWidth
      size="large"

    type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
      Send Code
    </Button>
  </Box>
</form>

    </Box>
  );
}
