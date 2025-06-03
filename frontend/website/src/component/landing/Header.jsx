import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navigation items that scroll to sections
  const navItems = [
    { label: 'Home', sectionId: 'hero' },
    { label: 'Features', sectionId: 'features' },
    { label: 'Testimonials', sectionId: 'testimonials' },
    { label: 'AI Features', sectionId: 'ai-features' },
  ];
  
  // Function to scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = -80; // Header height offset
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Close mobile drawer if open
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Handle mobile drawer toggle
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Mobile drawer content
  const drawer = (
    <Box sx={{ textAlign: 'center', pt: 2, height: '100%',  boxShadow: scrolled ? 3 : 0,
      bgcolor: scrolled?'rgba(255, 255, 255, 0.96)': 'transparent', // translucent white for glass feel
      backdropFilter: 'blur(2px)',       // always blurred like glass
      WebkitBackdropFilter: 'blur(2px)', // Safari support
      border: '1px solid rgba(255, 255, 255, 0.2)', // thin border
      transition: 'all 0.3s ease', }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
        <Box component="img" src="/Logo.png" alt="Logo" sx={{ height: 40 }} />
        <IconButton 
          color="inherit" 
          aria-label="close drawer" 
          edge="end" 
          onClick={handleDrawerToggle}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List sx={{ mt: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton 
              onClick={() => scrollToSection(item.sectionId)}
              sx={{ 
                      
                fontWeight: 'bold',
                borderRadius: '8px',
                px: 3,
                "&:hover":{
                  bgcolor:"#9a66ff22",
                  
                }
              }}
            >
              <ListItemText 
                primary={item.label} 
                primaryTypographyProps={{ 
                  fontWeight: 'bold',
                  fontSize: '1.1rem'
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton 
            component={RouterLink} 
            to="/auth/login"
            
            sx={{ 
                      
              fontWeight: 'bold',
              borderRadius: '8px',
              px: 3,
              "&:hover":{
                bgcolor:"#9a66ff22",
                
              }
            }}
          >
            <ListItemText 
              primary="Login" 
              primaryTypographyProps={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton 
            component={RouterLink}
            to="/auth/signup"
            variant="contained"
            sx={{ 
                      
              fontWeight: 'bold',
              borderRadius: '8px',
              px: 3,
              "&:hover":{
                bgcolor:"#9a66ff22",
                
              }
            }}
          >
            <ListItemText 
              primary="Sign Up" 
              primaryTypographyProps={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
      <AppBar
  position="fixed"
  sx={{
    boxShadow: scrolled ? 3 : 0,
    bgcolor: scrolled?'rgba(255, 255, 255, 0.96)': 'transparent', // translucent white for glass feel
    backdropFilter: 'blur(2px)',       // always blurred like glass
    WebkitBackdropFilter: 'blur(2px)', // Safari support
    border: '1px solid rgba(255, 255, 255, 0.2)', // thin border
    transition: 'all 0.3s ease',
  }}
>
          <Container maxWidth="lg">
            <Toolbar sx={{ py: 1 }}>
              {/* Logo */}
              <Box 
                component={RouterLink} 
                to="/" 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: scrolled ? '#333' : 'white',
                  mr: 2
                }}
              >
                <Box component="img" src="/Logo.png" alt="Logo" sx={{ height: 50,width:60, mr: 1 }} />
                <Typography color='#9a66ff' variant="h5" component="div" fontWeight="bold">
                  Thuraa
                </Typography>
              </Box>
              
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                {navItems.map((item) => (
                  <Button 
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    sx={{ 
                      marginX:1,
                      color: 'black',
                      fontWeight: 'bold',
                      '&:hover': {
                        bgcolor: '#9a66ff10',
                        color:"#9a66ff"
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              
              {/* Auth Buttons - Desktop */}
              <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 2, gap: 1 }}>
                  <Button 
                    component={RouterLink}
                    to="/auth/signup"
                    sx={{ 
                      
                      fontWeight: 'bold',
                      borderRadius: '8px',
                      px: 3,
                      "&:hover":{
                        bgcolor:"#9a66ff22",
                        
                      }
                    }}
                  >
                    Sign Up
                  </Button>
                <Button 
                  component={RouterLink}
                  to="/auth/login"
                  variant="contained"
                  sx={{ 
                    bgcolor: '#9a66ff',
                    color: 'white',
                    fontWeight: 'bold',
                    borderColor: 'white',
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': {
                      bgcolor: '#9a00ff',                      
                    }
                  }}
                >
                  Login
                </Button>
              </Box>
              
              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"

                onClick={handleDrawerToggle}
                sx={{
                  ml:"auto", 
                  display: { md: 'none' },
                  color: scrolled ? '#333' : 'white'
                }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: '80%',
            maxWidth: '300px'
          },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Toolbar placeholder to prevent content from hiding behind the AppBar */}
      <Toolbar />
    </>
  );
};

export default Header;
