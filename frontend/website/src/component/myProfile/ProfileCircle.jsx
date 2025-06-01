
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function ProfileCircle({ image, name, specialization, isEdit, onEdit }) {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
      alignItems: { xs: 'center', sm: 'flex-end' },
      gap: { xs: 2, sm: 5 },
      position: 'relative'
    }}>
      <Box sx={{ position: 'relative' }}>
        <Avatar
          src={image}
          alt={name}
          sx={{
            width: 160,
            height: 160,
            border: '3px solid white',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            bgcolor: '#ccc'
          }}
        />
        {isEdit && (
          <IconButton
            onClick={() => onEdit("specialization")}
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              color: 'rgba(102, 94, 223, 1)',
            }}
            size="small"
          >
            <EditIcon />
          </IconButton>
        )}
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: { xs: 0, sm: 2 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          {isEdit && (
            <IconButton
              size="small"
              sx={{ ml: 0.5 }}
              onClick={() => onEdit('name')}
              aria-label="Edit name"
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" sx={{ color: '#4B4B4B' }}>
            {specialization || 'Not Specialized'}
          </Typography>
          {isEdit && (
            <IconButton
              size="small"
              sx={{ ml: 0.5 }}
              onClick={() => onEdit('specialization')}
              aria-label="Edit specialization"
            >
              <EditIcon fontSize="small" color="primary" />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}
