import { IconButton, InputAdornment, TextField } from '@mui/material'
import React from 'react'
import ListAltIcon from "@mui/icons-material/ListAlt";

export default function MyInputField({register,errors,name,errorConfig,type,label,icon}) {
  return (
    <>
       <TextField
       type={type}
            fullWidth
            {...register(name,errorConfig)}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
            variant="outlined"
            color="primary"
            label={label}
            InputProps={icon?{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    {icon?icon:''}
                  </IconButton>
                </InputAdornment>
              ),
            }:''}
          />
    </>
  )
}
