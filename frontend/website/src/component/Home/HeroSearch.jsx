import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  InputAdornment,
  TextField,
  Paper,
  List,
  ListItem,
  Typography,
  Avatar,
  Chip,
  Stack,
  Grid,
  CircularProgress,
  Tabs,
  Tab
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import VerifiedIcon from "@mui/icons-material/Verified";

// Helper function to check if an object has a property
const hasProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [tabValue, setTabValue] = useState(0); // 0 for All, 1 for Teachers, 2 for Organizations
  const [isMouseOverResults, setIsMouseOverResults] = useState(false);
  const navigate = useNavigate();

  // Fetch teachers data
  const fetchTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4545/user/getTeachers");
      const data = await response.json();
      if (data.teachers) {
        setTeachers(data.teachers);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch organizations data
  const fetchOrganizations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4545/org/getOrganizations");
      const data = await response.json();
      if (data.organizations) {
        setOrganizations(data.organizations);
      }
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when component mounts
  useEffect(() => {
    fetchTeachers();
    fetchOrganizations();
  }, [fetchTeachers, fetchOrganizations]);

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) => {
    if (!query) return false;
    const searchTerm = query.toLowerCase();
    
    const matchUsername = teacher.username?.toLowerCase().includes(searchTerm);
    const matchSpecialization = teacher.specialization?.toLowerCase().includes(searchTerm);
    const matchBio = teacher.bio?.toLowerCase().includes(searchTerm);
    const matchEmail = teacher.email?.toLowerCase().includes(searchTerm);
    
    return matchUsername || matchSpecialization || matchBio || matchEmail;
  });

  // Filter organizations based on search query
  const filteredOrganizations = organizations.filter((org) => {
    if (!query) return false;
    const searchTerm = query.toLowerCase();
    
    const matchName = org.name?.toLowerCase().includes(searchTerm);
    const matchDescription = org.description?.toLowerCase().includes(searchTerm);
    const matchLocation = org.location?.toLowerCase().includes(searchTerm);
    const matchWebsite = org.website?.toLowerCase().includes(searchTerm);
    const matchEmail = org.contactEmail?.toLowerCase().includes(searchTerm);
    const matchTags = org.tags && typeof org.tags === 'object' && 
      Object.values(org.tags).some(tag => 
        typeof tag === 'string' && tag.toLowerCase().includes(searchTerm)
      );
    
    return matchName || matchDescription || matchLocation || matchWebsite || matchEmail || matchTags;
  });

  // Get all filtered results based on the selected tab
  const getFilteredResults = () => {
    if (tabValue === 1) return filteredTeachers;
    if (tabValue === 2) return filteredOrganizations;
    
    // For "All" tab, combine both results
    return [...filteredTeachers, ...filteredOrganizations];
  };

  // Handle navigation when clicking on a teacher
  const handleTeacherClick = (teacherId) => {
    navigate(`/profile/${teacherId}`);
    setQuery("");
    setIsFocused(false);
  };

  // Handle navigation when clicking on an organization
  const handleOrgClick = (orgId) => {
    navigate(`/org/${orgId}`);
    setQuery("");
    setIsFocused(false);
  };

  // Get initials for avatars
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle mouse events on results dropdown
  const handleResultsMouseEnter = () => {
    setIsMouseOverResults(true);
  };

  const handleResultsMouseLeave = () => {
    setIsMouseOverResults(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, position: "relative" }}>
      <TextField
        fullWidth
        placeholder="Search companies, or instructors..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          if (!isMouseOverResults) {
            setTimeout(() => setIsFocused(false), 150);
          }
        }}
        InputProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: 2,
            height: 56,
          },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      {/* Search Results Dropdown */}
      {query && (isFocused || isMouseOverResults) && (
        <Paper
          elevation={6}
          onMouseEnter={handleResultsMouseEnter}
          onMouseLeave={handleResultsMouseLeave}
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: "70vh",
            overflow: "auto",
            mt: 1.5,
            borderRadius: "12px",
            zIndex: 999,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "rgba(255, 255, 255, 0.98)",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{ 
              borderBottom: 1, 
              borderColor: "divider",
              '& .MuiTab-root': {
                fontWeight: 600,
                py: 1.5,
                transition: 'all 0.2s ease',
              },
              '& .Mui-selected': {
                color: theme => tabValue === 1 ? '#8e44ad' : 
                         tabValue === 2 ? theme.palette.primary.main : theme.palette.text.primary,
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
                backgroundColor: theme => tabValue === 1 ? '#8e44ad' : 
                                  tabValue === 2 ? theme.palette.primary.main : theme.palette.text.primary,
              }
            }}
          >
            <Tab label="All" icon={<span role="img" aria-label="all">🔍</span>} iconPosition="start" />
            <Tab label="Teachers" icon={<PersonIcon fontSize="small" />} iconPosition="start" />
            <Tab label="Organizations" icon={<BusinessIcon fontSize="small" />} iconPosition="start" />
          </Tabs>

          <List disablePadding>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress size={32} />
              </Box>
            ) : getFilteredResults().length === 0 ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">
                  No results found
                </Typography>
              </Box>
            ) : (
              getFilteredResults().map((item) => {
                // Determine if the item is a teacher or organization
                const isTeacher = hasProperty(item, "username");
                
                return (
                  <ListItem
                    button
                    key={item.id}
                    onMouseDown={() =>
                      isTeacher
                        ? handleTeacherClick(item.id)
                        : handleOrgClick(item.id)
                    }
                    sx={{
                      "&:hover": { 
                        backgroundColor: "rgba(0, 0, 0, 0.03)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                      },
                      py: 2,
                      px: 3,
                      borderRadius: "8px",
                      mx: 1,
                      my: 0.5,
                      transition: "all 0.2s ease",
                      border: "1px solid rgba(0, 0, 0, 0.04)",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    <Grid container spacing={2}>
                      {/* Avatar/Image */}
                      <Grid item>
                        {isTeacher ? (
                          <Avatar
                            src={item.profilePic}
                            sx={{ 
                              width: 70, 
                              height: 70,
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              border: "2px solid #fff",
                              backgroundColor: '#e8daef',
                              fontSize: "1.2rem",
                              fontWeight: "bold"
                            }}
                          >
                            {getInitials(item.username)}
                          </Avatar>
                        ) : (
                          <Avatar
                            src={item.profile}
                            sx={{ 
                              width: 70, 
                              height: 70,
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                              border: "2px solid #fff",
                              backgroundColor: theme => theme.palette.primary.light,
                            }}
                          >
                            <BusinessIcon sx={{ fontSize: 32 }} />
                          </Avatar>
                        )}
                      </Grid>

                      {/* Info */}
                      <Grid item xs>
                        <Stack spacing={0.5}>
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography 
                              variant="h6" 
                              fontWeight={700}
                              sx={{ 
                                color: isTeacher ? "#6c3483" : "primary.dark",
                                letterSpacing: "-0.3px",
                              }}
                            >
                              {isTeacher ? item.username : item.name}
                            </Typography>
                            {((isTeacher && item.verified) || 
                              (!isTeacher && item.isVerified)) && (
                              <VerifiedIcon
                                color={isTeacher ? "secondary" : "primary"}
                                fontSize="small"
                                sx={{ 
                                  color: isTeacher ? "#8e44ad" : undefined,
                                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
                                }}
                              />
                            )}
                          </Stack>

                          {/* Type */}
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                            <Chip
                              icon={isTeacher ? 
                                <PersonIcon sx={{ '&&': { fontSize: '0.9rem' } }} /> : 
                                <BusinessIcon sx={{ '&&': { fontSize: '0.9rem' } }} />}
                              label={isTeacher ? "Teacher" : "Organization"}
                              size="small"
                              color={isTeacher ? "secondary" : "primary"}
                              sx={{ 
                                fontWeight: 600, 
                                borderRadius: "12px",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                                '& .MuiChip-label': { px: 1 },
                                height: 26,
                                bgcolor: isTeacher ? '#f5eef8' : undefined,
                                color: isTeacher ? '#8e44ad' : undefined,
                                borderColor: isTeacher ? '#d6b8e6' : undefined,
                              }}
                            />
                            {isTeacher && item.specialization && (
                              <Chip
                                label={item.specialization}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  borderRadius: "12px",
                                  borderColor: "rgba(0,0,0,0.1)",
                                  color: "text.secondary",
                                  fontWeight: 500,
                                  height: 26,
                                }}
                              />
                            )}
                          </Stack>

                          {/* Description */}
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              mt: 1,
                              lineHeight: 1.5,
                              fontStyle: "italic",
                              backgroundColor: "rgba(0,0,0,0.01)",
                              p: 1,
                              borderRadius: "4px",
                              borderLeft: isTeacher ? '3px solid #d6b8e6' : theme => `3px solid ${theme.palette.primary.light}`,
                            }}
                          >
                            {isTeacher ? item.bio : item.description}
                          </Typography>
                        </Stack>
                      </Grid>

                      {/* Additional Info */}
                      <Grid item sx={{ width: 120 }}>
                        <Stack spacing={1} alignItems="flex-end">
                          {isTeacher ? (
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "text.secondary",
                                backgroundColor: "rgba(0,0,0,0.03)",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              <span role="img" aria-label="email">📧</span>
                              {item.email}
                            </Typography>
                          ) : (
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: "text.secondary",
                                backgroundColor: "rgba(0,0,0,0.03)",
                                px: 1.5,
                                py: 0.5,
                                borderRadius: "12px",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                              }}
                            >
                              {item.location ? (
                                <>
                                  <span role="img" aria-label="location">📍</span>
                                  {item.location}
                                </>
                              ) : (
                                <>
                                  <span role="img" aria-label="email">📧</span>
                                  {item.contactEmail}
                                </>
                              )}
                            </Typography>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}