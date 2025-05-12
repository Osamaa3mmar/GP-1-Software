import { Box, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
export default function Tools({setSearchTerm}) {
    const [search,setSearch]=useState('');
    const updateSearch=(e)=>{
        setSearchTerm(e.target.value);
        setSearch(e.target.value);
    }
  return (
    <Box sx={{width:"90%",display:"flex",alignItems:"center",marginX:"auto",justifyContent:"center"}}>
       <TextField
       value={search}
       onChange={updateSearch}
       label='Search By Course Name .'
       variant="filled"
       fullWidth
       slotProps={{
        input:{
            endAdornment:(
                <InputAdornment position="end">
                <SearchIcon/>
                </InputAdornment>
            )
        }
       }}
       />
    </Box>
  )
}
