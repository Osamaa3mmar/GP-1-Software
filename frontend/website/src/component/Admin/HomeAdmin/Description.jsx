import { Tooltip, Box, Chip, Typography, Paper, Divider, CircularProgress } from '@mui/material';
import style from './profile.module.css';
import EditIcon from '@mui/icons-material/Edit';
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryIcon from '@mui/icons-material/Category';
import DescriptionForm from './froms/DescriptionForm';

export default function Description({edit, description, setContent, setTitle, setModal, setOrg, orgId}) {
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async () => {
      if (!orgId) return;
      
      try {
        setLoadingCategories(true);
        const { data } = await axios.get(`http://localhost:4545/org/categories/${orgId}`);
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, [orgId]);
  const openDescriptionForm=()=>{
    setContent(<DescriptionForm setOrg={setOrg} setModal={setModal} description={description}/>);
    setTitle("Edit Organaization Description");
    setModal(true);
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ amount:0.5}}
    >
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          mb: 2,
          mt: 30, // Increased top margin to create more space
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          position: 'relative', // Ensure proper stacking
          zIndex: 1 // Place above profile image if needed
        }}
      >
        {/* Categories Section */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="500" color="primary.dark">
              Categories
            </Typography>
            <CategoryIcon color="primary" />
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {loadingCategories ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={30} />
            </Box>
          ) : categories.length > 0 ? (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {categories.map((category, index) => (
                <Chip 
                  key={index}
                  label={category}
                  color="primary"
                  variant="outlined"
                  sx={{ 
                    fontWeight: 500,
                    '&:hover': { boxShadow: 2, transform: 'translateY(-2px)' },
                    transition: 'all 0.2s ease'
                  }}
                />
              ))}
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              No categories available for this academy's courses.
            </Typography>
          )}
        </Box>
        
        {/* Description Section */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h5" fontWeight="500" color="primary.dark">
              Description
            </Typography>
            {edit && (
              <Tooltip title="Edit Academy Description">
                <EditIcon 
                  onClick={openDescriptionForm} 
                  sx={{ 
                    fontSize: 28, 
                    cursor: 'pointer', 
                    color: '#9c27b0', // Explicit color to ensure visibility
                    '&:hover': { color: '#7b1fa2' } 
                  }}
                />
              </Tooltip>
            )}
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              fontSize: '1.1rem', 
              lineHeight: 1.6,
              color: 'text.primary',
              whiteSpace: 'pre-line' // Preserve line breaks
            }}
          >
            {description || 'No description available for this academy.'}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  )
}
