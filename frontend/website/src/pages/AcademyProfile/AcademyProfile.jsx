import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import HomeAdmin from "../AdminPages/HomeAdmin";
import { Button, Chip, Tooltip, CircularProgress, Box } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { toast } from "react-toastify";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "../NotFound/NotFound";

export default function AcademyProfile() {
  const {user} = useContext(UserContext);
  const [isInIt, setIsInIt] = useState(false);
  const [loading, setLoading] = useState(true);
  const [academyExists, setAcademyExists] = useState(true);
  const {id} = useParams();
  
  const applay = async() => {
    try {
      const {data} = await axios.post("http://localhost:4545/applye/makeapplay", {
        userId: user?.id,
        orgId: id,
      }, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      toast.success(data.message);
    } catch(error) {
      toast.error(error.response.data.message);
    }
  }

  const checkIsInIt = async() => {
    try {
      const {data} = await axios.post("http://localhost:4545/applye/checkisinit", {
        orgId: id,
      }, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      if(data.isInIt) {
        setIsInIt(true);
      }
    } catch(error) {
      console.log(error);
    }
  }
  
  const checkAcademyExists = async() => {
    setLoading(true);
    try {
      // Fetch academy data to check if it exists
      const {data} = await axios.get(`http://localhost:4545/org/getorgbyid/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        }
      });
      console.log(data);      
      // If we get here, the academy exists
      setAcademyExists(true);
      
      // Check if user is an instructor if they're a tech
      if(user?.role === "tech") {
        await checkIsInIt();
      }
    } catch(error) {
      console.log("Academy not found:", error);
      setAcademyExists(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkAcademyExists();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!academyExists) {
    return <NotFound />;
  }

  return (
    <div style={{position:"relative",width:"90%",margin:"auto"}}>
      {user?.role === "tech" ? 
        (isInIt ? 
          <Chip 
            sx={{position:"absolute",top:400,left:0}} 
            color="primary" 
            icon={<CheckIcon />} 
            label="You Are Instructor In This Academy" 
            variant="filled" 
          /> : 
          <Tooltip 
            sx={{position:"absolute",top:400,left:0}} 
            title={"Send Resume"} 
            placement="top" 
            arrow
          >
            <Button onClick={applay} variant="contained" color="primary">
              Want to be an instructor?
            </Button>
          </Tooltip>
        ) : 
        ""
      }
      <HomeAdmin/>
    </div>
  )
}
