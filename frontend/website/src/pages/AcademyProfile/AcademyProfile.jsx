import { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import HomeAdmin from "../AdminPages/HomeAdmin";
import { Button, Tooltip } from "@mui/material";
export default function AcademyProfile() {
  const {user}=useContext(UserContext);
  return (
    <div style={{position:"relative",width:"90%",margin:"auto"}}>
      {user?.role=="tech"? <Tooltip sx={{position:"absolute",top:400,left:0}} title={"Send Resume"} placement="top" arrow>
      <Button  variant="contained" color="primary" >
        Want to be an instructor?
      </Button>
      </Tooltip>:"" }
      <HomeAdmin/>
    </div>
  )
}
