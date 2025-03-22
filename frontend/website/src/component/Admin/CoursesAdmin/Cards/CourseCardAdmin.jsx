import { Box, Button, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid2';
import SwitchActive from './SwitchActive';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';import CardImage from './CardImage';
export default function CourseCardAdmin() {
  return (
    <Grid container spacing={2} >
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    <Grid sx={{boxShadow:"0px 0px 6px rgba(0,0,0,0.4)",borderRadius:"10px",overflow:"hidden"}} size={{lg:4,sm:6,xs:10}}>
    <CardImage/>
    <Box>
    <Stack sx={{padding:"10px 20px"}}>
        <h2 style={{fontWeight:"600",fontSize:"22px"}}>Backend ASP 11</h2>
        <Stack direction={"row"} sx={{width:"100%",display:"flex" ,justifyContent:"space-between",padding:"15px"}}>
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Price</p>
             <h3>300</h3>
            </Stack>


            <Divider orientation="vertical" variant="middle" flexItem />
            <Stack spacing={2} direction={"column"} sx={{flexGrow:1,display:"flex",justifyContent:"center" ,alignItems:"center"}}>
             <p style={{fontWeight:"600" ,color:"gray"}}>Status</p>
             <SwitchActive/>
            </Stack>
        </Stack>
        <Stack direction={"row"} sx={{display:"flex"}} spacing={3}>
            <Button sx={{flexGrow:1,borderRadius:"8px",background:"#f1f5ff",border:"none",fontWeight:"400"}} variant='outlined'  startIcon={<ModeOutlinedIcon fontSize='18px'/>}>Edit</Button>
            <Button sx={{flexGrow:1,borderRadius:"8px",color:"red",border:"none",background:"#f7e9ed",fontWeight:"400"}} variant='outlined'  startIcon={<DeleteOutlinedIcon/>}>Delete</Button>
        </Stack>
    </Stack>
    </Box>
    </Grid>
    </Grid>
  )
}
