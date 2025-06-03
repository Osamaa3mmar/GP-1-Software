import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import { UserContext } from '../../Context/UserContext';

export default function Links({ links = [], isEdit, onPress ,id}) {
  // Map of icons by link type
  const iconMap = {
    github: GitHubIcon,
    facebook: FacebookIcon,
    linkedin: LinkedInIcon,
    twitter: TwitterIcon,
    youtube: YouTubeIcon,
  };

  // Map of styles by link type
  const styleMap = {
    github: {
      bgcolor: 'black',
      color: 'white',
      borderColor: 'black',
    },
    facebook: {
      bgcolor: '#4267B2',
      color: 'white',
      borderColor: '#4267B2',
    },
    linkedin: {
      bgcolor: '#0077B5',
      color: 'white',
      borderColor: '#0077B5',
    },
    twitter: {
      bgcolor: '#1DA1F2',
      color: 'white',
      borderColor: '#1DA1F2',
    },
    youtube: {
      bgcolor: '#FF0000',
      color: 'white',
      borderColor: '#FF0000',
    },
    default: {
      bgcolor: 'rgba(102, 94, 223, 1)',
      color: 'white',
      borderColor: 'rgba(102, 94, 223, 1)',
    }
  };

  const getLinkStyle = (link) => {
    const type = link.type?.toLowerCase() || '';
    return styleMap[type] || styleMap.default;
  };

  const getLinkIcon = (link) => {
    const type = link.type?.toLowerCase() || '';
    const Icon = iconMap[type] || LanguageIcon;
    return <Icon />;
  };

  const getLinkName = (link) => {
    return link.title || link.url?.replace(/^https?:\/\//, '') || link.type || 'Link';
  };
const [me,setMe]=useState(false);
  const {user}=useContext(UserContext);
  useEffect(()=>{
    if(user?.id==id){
      setMe(true);
    }
  },[user]);
  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
            Links
          </Typography>
          {me && (
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => onPress("Add Link")}
              sx={{
                borderColor: 'rgba(102, 94, 223, 1)',
                color: 'rgba(102, 94, 223, 1)',
                '&:hover': {
                  borderColor: 'rgba(102, 94, 223, 0.8)',
                  backgroundColor: 'rgba(102, 94, 223, 0.04)',
                }
              }}
            >
              Add Link
            </Button>
          )}
        </Box>
        
        {links && links.length > 0 ? (
          <Grid container spacing={2}>
            {links.map((link, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Button
                  variant="contained"
                  startIcon={getLinkIcon(link)}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  fullWidth
                  sx={{
                    bgcolor: getLinkStyle(link).bgcolor,
                    color: getLinkStyle(link).color,
                    '&:hover': {
                      bgcolor: getLinkStyle(link).bgcolor,
                      opacity: 0.9,
                    },
                    textTransform: 'none',
                    py: 1,
                  }}
                >
                  {getLinkName(link)}
                </Button>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
            No links added yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
}
