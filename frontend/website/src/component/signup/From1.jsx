import { ArrowForward, CloudUpload, Person, Visibility, VisibilityOff } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { SignupContext } from "./SignupContext";
import { toast } from "react-toastify";

export default function From1({setStep}) {
    const { register, handleSubmit,formState:{errors} } = useForm({mode:"onBlur"});
    const [image,setImage]=useState(null);
    const [password,setPassword]=useState(false);
    const [loading,setLoading]=useState(false);
    const {setId,setEmail}=useContext(SignupContext);
    const createUser = async(info) => {
        const formdata=new FormData();
        image?formdata.append("profile",info.profile[0]):'';
        formdata.append('username',info.username);
        formdata.append('password',info.password);
        formdata.append('email',info.email);
       
        try{
            setLoading(true);
            const {data}=await axios.post('http://localhost:4545/auth/signup', formdata);
            setId(data.id);
            setStep(1);
            setEmail(info.email);
        }
        catch(e){
            console.log(e);
            toast.error(e.response.data.message);
        }
        finally{
            setLoading(false);
        }
        
      };
      const handleImage=(e)=>{
        const file=e.target.files[0];
      
        if(file){
         
            const currentImage=URL.createObjectURL(file);
            
            setImage(currentImage);
        }
      }

      
      const handelPassword=()=>{
        setPassword(!password);
      }
  return (
    <form encType="multipart/form-data"
          onSubmit={handleSubmit(createUser)}
          className="flex flex-col gap-5"
          
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            <Box sx={{ width: "90px", height: "90px" ,position: "relative"}}>
              <Avatar sx={{ width: "90px", height: "90px",bgcolor:"#818cf8" }}>
               {image?<img src={image} alt="dfd" />:<Person sx={{fontSize:40}}/>}
              </Avatar>
              <IconButton component="label" sx={{position:"absolute",bgcolor:"#6366F1",bottom:'-4px',right:"-4px","&:hover":{bgcolor:"#4f46e5"}}}>
                <CloudUpload sx={{color:"white"}}/>
                <input type="file" accept="image/*" {...register("profile")} hidden onInput={handleImage} />
              </IconButton>
              
            </Box>
          </Box>
          <TextField
          sx={{"&:hover":{borderColor:"#818cf8"}}}
            InputProps={{
              style: { borderRadius: "12px" },
            }}
            variant="outlined"
            autoComplete="off"
            fullWidth
            label="Email"
            required
            type="email"
            {...register("email",{required:"* Email is required !",pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "* Please enter a valid email address"
              }})}
              error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
          sx={{"&:hover":{borderColor:"#818cf8"}}}
            InputProps={{ style: { borderRadius: "12px" } }}
            fullWidth
            variant="outlined"
            autoComplete="off"
            label="Username"
            required
            {...register("username",{required:"* Username is required !",minLength:{value:5,message:"* Must be at least 5 characters"}})}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
          sx={{"&:hover":{borderColor:"#818cf8"}}}
             InputProps={{
                style: { borderRadius: "12px" },
                endAdornment:(
                   <InputAdornment position="end">
                   <IconButton onClick={handelPassword}>
                    {password?<VisibilityOff />:<Visibility />}
                   </IconButton>
                   </InputAdornment>
                )
            }}
            fullWidth
            variant="outlined"
            autoComplete="off"
            label="Password"
            required
            type={password?"text":"password"}
            {...register("password",{required:"*Password Required !",minLength:{value:8,message:"* Must be at least 8 characters"}})}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
 

          <Button
            loading={loading?true:false}
            type="submit"
            variant="contained"
            sx={{ padding: "13px",bgcolor:"#818cf8", borderRadius: "12px" }}
            endIcon={            <ArrowForward/>
            }
          >
            Continue
          </Button>
          

        </form>
  )
}
