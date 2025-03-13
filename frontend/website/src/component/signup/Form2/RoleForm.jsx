import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Button, FormControl, RadioGroup } from "@mui/material";
import { useContext, useState } from "react";
import ChoiseCard from "./ChoiseCard";
import { useForm } from "react-hook-form";
import { SignupContext } from "../SignupContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function RoleForm({setStep}) {
    const{handleSubmit}=useForm();
    const {id}=useContext(SignupContext);
    const [loading,setLoading]=useState(false);
    const submit=async()=>{
        console.log(currentChoise);
        console.log(id)
        try{
            setLoading(true);
            const {data}=await axios.put('http://localhost:4545/auth/accounttype',{
                answer:currentChoise,
                id
            })
            console.log(data);
            toast.info(data.message);
            setStep(2);
        }
        catch(error){
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }
    const [currentChoise,setCurrentChoise]=useState('user');
    const handleChange=(event)=>{
        setCurrentChoise(event.target.value);
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
    <FormControl  component="fieldset" sx={{ width: "100%", mb: 3 }}>
      <RadioGroup
        aria-label="account-type"
        name="accountType"
        value={currentChoise?currentChoise:'user'}
        onChange={handleChange}
      >
        
        <ChoiseCard value={currentChoise} change={handleChange} i={0}/>
        <ChoiseCard value={currentChoise} change={handleChange} i={1}/>
        <ChoiseCard value={currentChoise} change={handleChange} i={2}/>
      

      </RadioGroup>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" sx={{ flex: 1 }} startIcon={<ArrowBack />}>
          {" "}
          Back
        </Button>
        <Button loading={loading?true:false} type="submit" variant="contained" sx={{ flex: 1 }} endIcon={<ArrowForward />}>
          {" "}
          Continue
        </Button>
      </Box>
    </FormControl>
    </form>
  );
}
