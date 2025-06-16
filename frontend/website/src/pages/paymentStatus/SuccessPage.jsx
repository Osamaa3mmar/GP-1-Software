
import { 
  Box, 
  Typography, 
  Paper, 
} from '@mui/material';
import { 
  CheckCircleOutline as SuccessIcon,
} from '@mui/icons-material';
import { useEffect } from 'react';
import { use } from 'react';
import { UserContext } from '../../Context/userContext';
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserNotificationsContext } from '../../Context/NotificationsUserContext';
import { OsamaCartContext } from '../../Context/CartOsama';

export const SuccessPage = () => {
    const {setCartCount,cartCount}=useContext(OsamaCartContext);
    const {getCount}=useContext(UserNotificationsContext);
    const navigate = useNavigate();

  const completePurchase=async()=>{
  try{
      const {data}=await axios.get("http://localhost:4545/cart/purchase",{
        headers:{
          token: localStorage.getItem("token"),
        }
      })
      getCount();
      console.log(data);
      setCartCount(0);
      navigate("");
    }catch(error){
      console.error("Error during purchase:", error);
    }
  }
  useEffect(()=>{
    completePurchase();
  },[])
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        borderTop: '4px solid #4CAF50',
        width:"80%",
        margin:"auto",
        marginTop:"150px",
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'rgba(76, 175, 80, 0.1)', 
          p: 4, 
          textAlign: 'center' 
        }}
      >
        <SuccessIcon 
          sx={{ 
            fontSize: 80, 
            color: '#4CAF50', 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: '#2E7D32'
          }}
        >
          Payment Successful!
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 1, 
            color: '#388E3C' 
          }}
        >
          Thank you for your purchase
        </Typography>
      </Box>
      
      
    </Paper>
  );
};