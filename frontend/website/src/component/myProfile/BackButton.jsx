
import { IconButton, Tooltip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <Tooltip title="Go Back">
      <IconButton 
        onClick={handleBack}
        sx={{ 
          color: 'white',
          bgcolor: 'rgba(0,0,0,0.2)',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.3)'
          },
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
