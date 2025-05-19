import { Box, Chip, IconButton, Tooltip, useTheme } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useContext } from "react";
import { OrgNotificationsContext } from "../../Context/NotificationsOrgContext";
export default function AssignCourseCard({
  title,
  thumbnail,
  id,
  tags,
  price,
  userId,
  reload,
  assign,
}) {
  const {setNotificationCount}=useContext(OrgNotificationsContext);
    const unAssigendCourse=async()=>{
        try{
            const{data}=await axios.post("http://localhost:4545/applye/unassign/instructor",{
                courseId:id,
                userId:userId
            },{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
            reload();
            setNotificationCount((prev)=>(prev+1))
            console.log(data);
            toast.info(data.message);
        }catch(error){
            toast.error(error.response.data.message);
        }
    }
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "95%",
        marginX: "auto",
        borderRadius: "15px",
        overflow: "hidden",
        border: "1px solid #ccc",
        paddingRight: "20px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        transition: "all 0.3s ",
        "&:hover": {
          boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
          transform: "translateY(5px)",
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
        marginBottom: "20px",
        height: "100px",
      }}
    >
      <Box sx={{ marginRight: "20px", width: "200px" }}>
        <img src={thumbnail} alt="" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "80%",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: "600" }}>{title}</h1>
        <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Chip label={"Course Id: " + id} />
          <Chip
            sx={{ color: "green" }}
            label={price}
            icon={<AttachMoneyIcon color="green" sx={{ color: "green" }} />}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          marginLeft: "auto",
        }}
      >
        {assign?
        <Tooltip title="Assign To This Course">
          <IconButton onClick={()=>{assign(id);setNotificationCount((prev)=>(prev+1))}}>
<PersonAddAlt1Icon sx={{fontSize:30,color:theme.palette.primary.main
}}/>
          </IconButton>
        </Tooltip>:
        
        <>
        <Tooltip title="Unassign From This Course">
          <IconButton onClick={unAssigendCourse} sx={{ background: "rgba(255,0,0,0.05)" }}>
            <RemoveIcon sx={{ fontSize: "30px", color: "red" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Class Room">
          <IconButton sx={{ background: "rgba(0,0,255,0.05)" }}>
            <KeyboardArrowRightIcon
              sx={{ fontSize: 28, color: theme.palette.primary.main }}
            />
          </IconButton>
        </Tooltip>
        </>}
      </Box>
    </Box>
  );
}
