import { Avatar, Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import SearchIcon from '@mui/icons-material/Search';
import { useWindowSize } from 'react-use';

export default function UserInfo({search}) {
  const { width } = useWindowSize();
  const [val,setVal]=useState('');
    const searchTerm=(e)=>{
      search(e.target.value);
      setVal(e.target.value);
    }
    const {user}=useContext(UserContext);
  return (
    <Box sx={{padding:"15px 35px",marginTop:"20px",width:"100%",bgcolor:"#d9d9db44",gap:"20px",borderRadius:"20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap"}}>
     
         <Stack sx={{flexGrow:1,maxWidth:width<700?"100%":"60%",alignItems:"center"}}  direction={"row"}>
          <TextField variant="standard" label="Search"
          value={val}
          onChange={searchTerm}
          fullWidth
          slotProps={{
            input:{
              startAdornment:(
                <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
              )
            }
          }}/>
          {/* :
          searchType=="Price"?<Box sx={{width:"100%",display:"flex",alignItems:"center",marginTop:"20px",paddingRight:"20px"}}><Slider min={0} max={9999} step={200} value={price} onChange={handlePriceValue} defaultValue={0} aria-label="Default" valueLabelDisplay="auto" /></Box>:''
          } */}
{/* <FormControl variant="standard" sx={{width:"200px"}}>
  <InputLabel  id="demo-simple-select-label">Search By</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={searchType}
    label="Search By"
    onChange={handleSearchType}
  >
    <MenuItem value={'Title'}>Title</MenuItem>
    <MenuItem value={'Price'}>Price</MenuItem>
    <MenuItem value={'Tags'}>Tags</MenuItem>
  </Select>
</FormControl> */}
         </Stack>
         <Box sx={{display:"flex",alignItems:"center",gap:"10px"}}>
        <Avatar alt="Remy Sharp" src={user?user.profilePic:null} />
         <Stack>
            <h2 style={{fontSize:"20px",textTransform:"capitalize",fontWeight:"600"}}>{user?user.username:"none"}</h2>
            <p style={{color:"gray"}}>{user?user.email:"none@gmail.com"}</p>
         </Stack>
         </Box>
    </Box>
  )
}
