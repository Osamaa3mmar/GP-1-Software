import { 
  Box, 
  Paper, 
  TextField, 
  FormControl, 
  Select, 
  MenuItem,
  InputAdornment,
  Typography,
  Divider,
  Chip,
  alpha,
  styled
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import TuneIcon from '@mui/icons-material/Tune';

// Custom styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: '2rem',
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  overflow: 'hidden',
  position: 'relative',
}));

const SearchTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: alpha('#f5f7fa', 0.8),
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: alpha('#f5f7fa', 0.9),
    },
    '&.Mui-focused': {
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2e8f0',
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4a90e2',
    borderWidth: '1px',
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: alpha('#f5f7fa', 0.8),
  transition: 'all 0.3s',
  '&:hover': {
    backgroundColor: alpha('#f5f7fa', 0.9),
  },
  '&.Mui-focused': {
    backgroundColor: 'white',
    boxShadow: '0 0 0 3px rgba(74, 144, 226, 0.1)',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#e2e8f0',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#4a90e2',
    borderWidth: '1px',
  },
}));

const CourseSearchFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange, 
  categories 
}) => {
  return (
    <StyledPaper elevation={2}>
      {/* Title bar with icon */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          pb: 1.5,
          borderBottom: '1px solid #f0f0f0'
        }}
      >
        <TuneIcon sx={{ color: '#4a90e2', mr: 1.5 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.1rem',
            color: '#2d3748'
          }}
        >
          Search & Filters
        </Typography>
      </Box>
      
      {/* Search and filter content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '1.5rem', md: '1.2rem' },
          alignItems: { md: 'flex-end' }
        }}
      >
        {/* Search field */}
        <Box 
          sx={{ 
            position: 'relative', 
            width: '100%', 
            flex: { md: 2 },
            order: { xs: 1, md: 1 }
          }}
        >
          <Typography 
            variant="subtitle2" 
            sx={{ 
              mb: 1, 
              fontWeight: 500, 
              color: '#4b5563',
              fontSize: '0.9rem'
            }}
          >
            Search Courses
          </Typography>
          <SearchTextField
            fullWidth
            placeholder="Type to search for courses..."
            value={searchQuery}
            onChange={onSearchChange}
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#6b7280' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Vertical divider for desktop */}
        <Divider 
          orientation="vertical" 
          flexItem 
          sx={{ 
            display: { xs: 'none', md: 'block' },
            mx: 1
          }} 
        />
        
        {/* Horizontal divider for mobile */}
        <Divider 
          sx={{ 
            display: { xs: 'block', md: 'none' },
            width: '100%'
          }} 
        />
        
        {/* Category filter */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            width: '100%',
            flex: { md: 1 },
            minWidth: { md: '220px' },
            order: { xs: 2, md: 2 }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <FilterListIcon sx={{ color: '#4a90e2', mr: 1, fontSize: '1rem' }} />
            <Typography 
              variant="subtitle2" 
              sx={{ 
                fontWeight: 500, 
                color: '#4b5563',
                fontSize: '0.9rem'
              }}
            >
              Filter by Category
            </Typography>
          </Box>
          
          <FormControl fullWidth variant="outlined" size="medium">
            <StyledSelect
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              displayEmpty
              renderValue={(selected) => {
                if (selected === 'all') {
                  return 'All Categories';
                }
                return (
                  <Chip 
                    label={selected} 
                    size="small" 
                    sx={{ 
                      backgroundColor: alpha('#4a90e2', 0.1),
                      color: '#4a90e2',
                      fontWeight: 500,
                      '& .MuiChip-label': { px: 1 }
                    }} 
                  />
                );
              }}
            >
              <MenuItem value="all">
                <em>All Categories</em>
              </MenuItem>
              {Array.isArray(categories) && categories.map((category) => (
                <MenuItem 
                  key={category.id} 
                  value={category.name}
                >
                  {category.name}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>
      
      {/* Active filters section */}
      {selectedCategory !== 'all' && (
        <Box 
          sx={{ 
            mt: 2.5, 
            pt: 1.5, 
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#4b5563',
              fontWeight: 500,
              mr: 1
            }}
          >
            Active Filters:
          </Typography>
          <Chip 
            label={selectedCategory} 
            onDelete={() => onCategoryChange('all')}
            size="small"
            sx={{ 
              backgroundColor: alpha('#4a90e2', 0.1),
              color: '#4a90e2',
              '&:hover': {
                backgroundColor: alpha('#4a90e2', 0.2),
              }
            }}
          />
        </Box>
      )}
    </StyledPaper>
  );
};

export default CourseSearchFilter;
