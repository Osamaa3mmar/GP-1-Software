import React from 'react';
import { Badge, Box } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonIcon from '@mui/icons-material/Person';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkOffIcon from '@mui/icons-material/WorkOff';
export default function Icon({ icon ,isRead}) {
  const iconMaps = {
    user: <PersonIcon sx={{ fontSize: 28, color: '#1976d2' }} />,
    // Add more icon mappings if needed
    applay:<InsertDriveFileIcon sx={{ fontSize: 28, color:"#00007c" }} />,
    create: <AddCircleIcon sx={{ fontSize: 28, color:"#388e3c" }} />,
    edit: <EditIcon sx={{ fontSize: 28, color:"#f57c00" }} />,
    warning: <WarningAmberIcon sx={{ fontSize: 28, color:"#d32f2f" }} />,
    add:<AddIcon sx={{ fontSize: 28, color:"#6a1b9a" }}/>,
    unassign:<PersonOffIcon sx={{ fontSize: 28, color:"#d32f2f" }}/>,
    assign:<BusinessCenterIcon sx={{ fontSize: 28, color:"#388e3c" }}/>,
    kick:<WorkOffIcon sx={{ fontSize: 28, color:"red" }}/>
  };
  console.log(isRead)
  return (
    <Box>
      {iconMaps[icon.toLowerCase()] || <HelpOutlineIcon sx={{ fontSize: 24, color: 'gray' }} />}
    </Box>
  );
}
