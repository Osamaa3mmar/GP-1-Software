import { Avatar, AvatarGroup, Box, Button, Tooltip } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function SwipeCard({openTable,course}) {
  return (
    <Grid size={{lg:4,md:6,sm:6,xs:12}} sx={{gap:"6px",overflow:"hidden",borderRadius:"12px",background:"#ffffff",boxShadow:"0px 0px 6px rgba(0,0,0,0.2)"}}>
      <div style={{flexGrow:1}}>
        <Box sx={{borderRadius:"12px 12px 0px 0px",width:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",height:"170px"}}>
        <img src={course.thumbnail} style={{width:"100%"}}/>
        </Box>
        <Box sx={{paddingX:"15px",paddingY:"10px",display:"flex",alignItems:"flex-start",justifyContent:"space-between"}}>
        <h3 style={{fontSize:"24px",fontWeight:"600"}}>{course?course.title:''}</h3>
        <Button size="small" sx={{textWrap:"nowrap"}}  onClick={()=>openTable(course.id)} variant="outlined">View All</Button>
        </Box>
<Box sx={{paddingBottom:"10px",paddingLeft:"15px",display:"flex",justifyContent:"flex-start"}}>
  {course.enrollments.length>0?
  <AvatarGroup sx={{cursor:"pointer"}} spacing={8}  max={5}>
      {course.enrollments.map((en)=>{
        return  <Tooltip placement="top" title={en.student.username} key={en.id}>
        <Avatar  alt="Remy Sharp" src={en.student.profilePic} />
        </Tooltip>
      })}
</AvatarGroup>
  :<p style={{textTransform:"capitalize",fontWeight:"500",fontSize:"14px",color:""}}>no one enroll yet</p>}
    
</Box>
</div>
    </Grid>
    
  )
}
