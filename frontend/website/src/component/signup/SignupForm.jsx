import {
    Avatar,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import style from './form.module.css'
import { CloudUpload, Person } from "@mui/icons-material";
export default function SignupForm({pos}) {
  const { register, handleSubmit } = useForm();
  const signup = (data) => {
    console.log(data);
    pos(2);
  };
  
  return (
    <form onSubmit={handleSubmit(signup)} className={style.form}>
         <Avatar sx={{ m: 1, bgcolor: "primary.main", width: 70, height: 70, mx: "auto" }}>
              <Person fontSize="large"/>
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: "center" }}>
            Sign Up
          </Typography>
        <Button variant="outlined" component="label" startIcon={<CloudUpload />} fullWidth>
                Upload Profile Image
                <input {...register('image')} type="file" hidden accept="image/*"/>
              </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "white",
        }}
      >
        <TextField
          required
          autoComplete="off"
          {...register("username")}
          id="Username"
          label="Username"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          autoComplete="off"
          {...register("email")}
          id="Email"
          label="Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          autoComplete="off"
          {...register("password")}
          id="Password"
          label="Password"
          variant="outlined"
          fullWidth
        />
        <TextField
          required
          autoComplete="off"
          {...register("passwordConfirmation")}
          id="passwordConfirmation"
          label="Password"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: "10px",padding:"10px 0px 20px 0px" }}>
  <Button variant="contained" fullWidth type="submit">
    Next
  </Button>
</Box>
    </form>
  );
}
