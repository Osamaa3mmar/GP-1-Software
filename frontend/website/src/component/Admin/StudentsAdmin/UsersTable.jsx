import { Avatar, Chip, IconButton, Paper } from "@mui/material"
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
dayjs.extend(relativeTime);
export default function UsersTable({courseId}) {
const [loading,setLoading]=useState(false);
const [rows,setRows]=useState([]);


const makeRow=(users)=>{
  let rows=[];
  
  users.forEach((item)=>{
    let temp={
      profile:item.student.profilePic,
      name:item.student.username,
      id:item.student.id,
      email:item.student.email,
      points:item.points,
      status:"Complete",
      join:item.createdAt
    }
    rows.push(temp);
  })
  console.log(rows);

  return rows;
}
const getUsers=async ()=>{
try{
  setLoading(true);
  await new Promise(resolve => setTimeout(resolve, 400))
  const {data}=await axios.get(`http://localhost:4545/enrollments/all/${courseId}`,{
    headers:{
      token: localStorage.getItem("token")
    }
  })
  setRows(makeRow(data.users));
}catch(error){
  toast.error(error.response.data.message);
}
finally{
  setLoading(false);
}
}


  useEffect(()=>{
    getUsers();
  },[courseId])
    const columns = [
        {
            field: 'profile',
            headerName: 'Profile',
            flex:1.2,
            description: 'Profile picture',
            align: 'center',
            headerAlign: 'center',

            renderCell: (params) => (
              
              <div style={{ height:"100%",display: 'flex', alignItems: 'center',justifyContent:"center"}}>
              <IconButton>
             <Avatar src={params.formattedValue}  sx={{width:"32px",height:"32px"}}/>
             </IconButton>
            </div>
            )
          },
          {
            field: 'name',
            headerName: 'Student Name',
            flex:2,
            description: 'Profile picture',
            align: 'center',
            headerAlign: 'center',
          },
          {
            field: 'email',
            headerName: 'Email',
            flex:2.1,
            description: 'Profile picture',
            align: 'center',
            headerAlign: 'center',
           
          },
          {
            field: 'join',
            headerName: 'Join Date',
            flex: 1.8,
            renderCell: (params) => {
              const date = dayjs(params.row.join);
              return <span>{date.fromNow()}</span>; // e.g., "2 hours ago"
            },
            align: 'center',
            headerAlign: 'center',
          },
          
          {
            field: 'status',
            headerName: 'Status',
            flex:1.5,
            description: 'Profile picture',
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => (
                <Chip label={params.formattedValue}/>
              )
          },
          {
            field: 'points',
            headerName: 'Points',
            flex:1.5,
            description: 'Profile picture',
            align: 'center',
            headerAlign: 'center',
           
          },
          
      ];
      

      
      
      const paginationModel = { page: 0, pageSize: 10 };
      



  return (
    
        <Paper sx={{ height: 500, width: "97%",margin:"auto" }}>
      <DataGrid
      loading={loading}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        
      />
    </Paper>
    
  )
}
