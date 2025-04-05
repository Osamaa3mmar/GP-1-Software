import { FormControlLabel, Switch } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SwitchActive({state,id}) {
  
    const IOSSwitch = styled((props) => (
        <Switch   focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
      ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#65C466',
              opacity: 1,
              border: 0,
              ...theme.applyStyles('dark', {
                backgroundColor: '#2ECA45',
              }),
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
            ...theme.applyStyles('dark', {
              color: theme.palette.grey[600],
            }),
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            ...theme.applyStyles('dark', {
              opacity: 0.3,
            }),
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
        },
        '& .MuiSwitch-track': {
          borderRadius: 26 / 2,
          backgroundColor: '#E9E9EA',
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: 500,
          }),
          ...theme.applyStyles('dark', {
            backgroundColor: '#39393D',
          }),
        },
      }));
      const changeStatus=async()=>{
        try{
          const {data}=await axios.put(`http://localhost:4545/course/togglestatus/${id}`,{},
            {
              headers: {
                token: localStorage.getItem("token"),
              },
            })
          toast.info(data.message);
        }
        catch(error){
          toast.error(error.response.data.message);
        }

      }
  return (
    <FormControlLabel
    onChange={changeStatus}
        control={<IOSSwitch sx={{ m: 0 }} defaultChecked={state=='notStarted'?false:true} />}
        label=""
      />
  )
}
