import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({mode:"onBlur"});
  const [visable,setVisable]=useState(false);
  const changeVisability=()=>{
    setVisable(!visable);
  }

  const [loading,setLoding]=useState(false);
  const navigate=useNavigate();
  const login=async(info)=>{
    setLoding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));//fake delay for design porpus

    try{
        const {data}=await axios.post('http://localhost:4545/auth/login',info);
       
        console.log(data);
        toast.success(data.message);
        localStorage.setItem('token',data.token);
        navigate('/main');
    }
    catch(e){
        console.log(e)
        toast.error(e?.response?.data?.message);
    }
    finally{
        setLoding(false);
    }
  }
  return (
    <form onSubmit={handleSubmit(login)}>
      <Stack spacing={2}>
        <Stack direction={"column"} spacing={3}>
          <TextField
          disabled={loading}
            type="email"
            label={"Email"}
            required
            InputProps={
                {
                    style:{borderRadius:"12px"}
                }
            }
            
            {...register("email",{required:" * Email required",pattern:{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "* Please enter a valid email address !"
              }})}
              error={!!errors.email}
              helperText={errors.email?.message}
          />
          <TextField
          disabled={loading}
            type={visable?"text":"password"}
            label={"Password"}
            required    
            sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px", // ✅ Apply border-radius correctly
                },
              }}
            slotProps={{
                input:{
                    endAdornment:(
                        <InputAdornment>
                        <IconButton onClick={changeVisability}>{visable?<VisibilityOff/>:<Visibility/>}</IconButton>
                        </InputAdornment>
                    )
                },
                
            }}
            {...register("password",{required:"* Password is required !",minLength:{value:8,message:"* password min length is 8 !"}})}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={<Checkbox  />}
            label="Remember me"
          />
          <Link
            to={"/auth/forget"}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Forgot password?
          </Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          size="lg"
          sx={{
            padding: "10px",
            borderRadius: "6px",
            textTransform: "capitalize",
          }}
          loading={loading}
          startIcon={<LoginIcon />}
        >
          Log in
        </Button>
      </Stack>
    </form>
  );
}




