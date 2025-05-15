import { Email, Height } from "@mui/icons-material";
import { Badge, Box, Button, Divider, Modal, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import InstractorCard from "./InstractorCard";
import { toast } from "react-toastify";

export default function InstructorsTools() {
     const [number,setNumber]=useState(0);
     const [Applications,setApplications]=useState([]);
      const {user}=useContext(UserContext);
      const getApplications = async () => {
        try{
            const {data}= await axios.get(`http://localhost:4545/applye/getresumesrrginfo/${user?.orgId}`);
            setNumber(data.resumes.length);
            setApplications(data.resumes);
        }catch(error){
            console.log(error);
        }

    }

    useEffect(() => {
        getApplications();

    },[user])
    const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height:"500px",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  overflow:"auto",
  p: 4,
};
    const accept=async(id)=>{
        try{
            const {data}=await axios.get(`http://localhost:4545/applye/setStatusaccept/${id}`);
            toast.success(data.message);
            getApplications();
            
        }catch(error){
            console.log(error);
        }
    }
    const denied=async(id)=>{
            try{
                const {data}=await axios.get(`http://localhost:4545/applye/setStatusdenied/${id}`);
                toast.success(data.message);
                getApplications();
            }catch(error){
                console.log(error);
            }
        }
  return (
    <Box
    sx={{display:"flex",flexWrap:"wrap",gap:"10px",alignItems:"center",justifyContent:"space-between",padding:"20px",backgroundColor:"#e5e5e5",borderRadius:"8px"}}>
        <TextField
        label={"Search"}
        sx={{width:"500px"}}/>
        <Badge badgeContent={number} color="primary">
  <Button onClick={handleOpen} endIcon={<Email/>} size="large" variant="contained" color="primary">
    Applications

  </Button>
</Badge>
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Applications
            </Typography>
            <Divider/>
            <Stack sx={{marginTop:3}} spacing={2} direction={"column"}>
            {Applications.length>0?
            Applications.map((item,index)=>{
                return <InstractorCard accept={accept} denied={denied} {...item} key={index}/>
            })            
            :"No Applications"}
            </Stack>
        </Box>
      </Modal>
    </Box>
  )
}
