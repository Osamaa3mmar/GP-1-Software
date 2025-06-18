import { 
  Box, 
  Typography, 
  Paper, 
  
} from '@mui/material';
import { 
  ErrorOutline as ErrorIcon,
} from '@mui/icons-material';


export const FailedPage = () => {
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: 4, 
        overflow: 'hidden',
        borderTop: '4px solid #F44336',
        width:"80%",
        margin:"auto",
        marginTop:"150px",
      }}
    >
      <Box 
        sx={{ 
          bgcolor: 'rgba(244, 67, 54, 0.1)', 
          p: 4, 
          textAlign: 'center' 
        }}
      >
        <ErrorIcon 
          sx={{ 
            fontSize: 80, 
            color: '#F44336', 
            mb: 2 
          }} 
        />
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            color: '#D32F2F'
          }}
        >
          Payment Failed
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mt: 1, 
            color: '#E53935' 
          }}
        >
          We couldn not process your payment
        </Typography>
      </Box>
      
      
    </Paper>
  );
};