import { Box, Button, Divider, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SwitchActive from "./SwitchActive";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import CardImage from "./CardImage";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";

export default function CourseCardAdmin({ course,setCourses }) {
  const deleteCourse = async (id) => {
    const answer = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (answer.isConfirmed) {
      const loading = toast.loading("Deleting !");
      try {
        const { data } = await axios.delete(
          `http://localhost:4545/course/delete/${id}}`,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        setCourses();
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete course");
      } finally {
        toast.dismiss(loading);
      }
    } else {
      toast.info("Delete Canceled !");
    }
  };

  if (!course) {
    return <div>Loading . .. . </div>;
  }
  return (
    <Grid
      key={course.id}
      sx={{
        
        boxShadow: "0px 0px 6px rgba(0,0,0,0.4)",
        borderRadius: "12px",
        padding: "10px",
        overflow: "hidden",
        transition: "transform 0.3s ease-out",
        background:"#ffffff",
        margin:{
          lg:"0px",
          md:"0px",
          xs:"auto"
        },
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
      size={{lg:4,md:6,sm:10,xs:12 }}
    >
      
      <CardImage url={course.thumbnail} />
      <Box>
        <Stack sx={{ padding: "10px 20px 15px 20px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontWeight: "600", fontSize: "22px" }}>
              {course.title}
            </h2>
            
            <Button sx={{ color: "#6366F1", bgcolor: "#6366F110" }}>
              View
            </Button>
          </Box>
          <Stack
            direction={"row"}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "15px",
            }}
          >
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: "600", color: "gray" }}>Price</p>
              <h3>{course.price}</h3>
            </Stack>

            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack
              spacing={2}
              direction={"column"}
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p style={{ fontWeight: "600", color: "gray" }}>Status</p>
              <SwitchActive id={course.id} state={course.completionStatus} />
            </Stack>
          </Stack>
          {/* <Stack>
            <h3 style={{fontWeight:"500",fontSize:"18px",color:"gray"}}>Instructor:</h3>
        <Stack direction={"row"} sx={{padding:"0px 0px 10px 0px"}}>
        <ListItemButton sx={{display:"flex",alignItems:"center",justifyContent:"start",gap:"10px"}}>
            <Avatar/>
            <div >
            <h3 style={{fontWeight:"500"}}>Osama</h3>
            <p style={{color:"gray"}}>osama1111222@gmail.com</p>
            </div>
            
            </ListItemButton>
            <IconButton sx={{width:"40px",height:"40px",alignSelf:'center'}}>
            
                <MoreVertIcon/>
            </IconButton>
        </Stack>
        
        </Stack> */}

          <Stack direction={"row"} sx={{ display: "flex" }} spacing={3}>
            <Button
              sx={{
                flexGrow: 1,
                borderRadius: "8px",
                background: "#f1f5ff",
                border: "none",
                fontWeight: "400",
              }}
              variant="outlined"
              startIcon={<ModeOutlinedIcon fontSize="18px" />}
            >
              Edit
            </Button>
            <Button
              sx={{
                flexGrow: 1,
                borderRadius: "8px",
                color: "red",
                border: "none",
                background: "#f7e9ed",
                fontWeight: "400",
              }}
              variant="outlined"
              startIcon={<DeleteOutlinedIcon />}
              onClick={() => deleteCourse(course.id)}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  );
}
