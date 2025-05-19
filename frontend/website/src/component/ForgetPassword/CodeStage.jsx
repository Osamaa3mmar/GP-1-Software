import { Box, Button, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export default function CodeStage({setCode,setStep}) {
    const {register,handleSubmit,formState:{errors}}=useForm();


    const setCodeInEmail=(info)=>{
        setCode(info.code);
        setStep(2);
    }
  return (
    <Box sx={{ width: '100%' }}>
       <form onSubmit={handleSubmit(setCodeInEmail)}>
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
    type="submit" variant="contained" endIcon={<ArrowForwardIcon />}>
      Send Code
    </Button>
     <Button 
      sx={{
      
        padding:"10px 20px",
       
        borderRadius:"13px",
        
    }}
     onClick={()=>{setStep(0)}} variant="outlined" endIcon={<ArrowBackIcon />}>
      Back
    </Button>
  </Box>
</form>

    </Box>

  )
}
