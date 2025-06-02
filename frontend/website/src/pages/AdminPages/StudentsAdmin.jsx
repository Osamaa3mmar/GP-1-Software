import { Box, Button, CircularProgress, Stack, Typography, Paper, Grid, Divider, Card, CardContent, Chip, useTheme, Avatar } from "@mui/material";
import Tools from "../../component/Admin/StudentsAdmin/Tools";
import { useContext, useEffect, useState } from "react";
import UsersTable from "../../component/Admin/StudentsAdmin/UsersTable";
import CourseSwipeCard from "../../component/Admin/StudentsAdmin/CourseSwipeCard";

import axios from "axios";
import { UserContext } from "../../Context/userContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function StudentsAdmin() {
  const { user } = useContext(UserContext);
  const theme = useTheme();
  const [search, setSearch] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalEnrollments: 0,
    activeStudents: 0,
    topPerformers: [],
    enrollmentsByMonth: [],
    courseDistribution: []
  });
  
  const open = (id) => {
    setShowTable(true);
    setCurrentCourse(id);
  }

  const fetchStats = async () => {
    if (!user?.orgId) return;
    
    try {
      setLoading(true);
      // Use the new dedicated statistics endpoint
      const { data } = await axios.get(`http://localhost:4545/enrollments/statistics/${user.orgId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      
      // Get the statistics from the response
      const statistics = data.stats || {};
      
      // Add color information to course distribution for the pie chart
      const courseDistributionWithColors = statistics.courseDistribution && statistics.courseDistribution.length > 0 
        ? statistics.courseDistribution.map((course, index) => ({
            ...course,
            fill: `${theme.palette.primary.main}${Math.floor(Math.random() * 99) + 1}`
          }))
        : [];
      
      // Update state with the statistics from the backend
      setStats({
        totalStudents: statistics.totalStudents || 0,
        totalEnrollments: statistics.totalEnrollments || 0,
        activeStudents: statistics.activeStudents || 0,
        topPerformers: statistics.topPerformers || [],
        enrollmentsByTwoWeeks: statistics.enrollmentsByTwoWeeks || [],
        courseDistribution: courseDistributionWithColors,
        courses: statistics.courses || []
      });
      
    } catch (error) {
      console.error("Error fetching statistics:", error);
      // Set default empty values in case of error
      setStats({
        totalStudents: 0,
        totalEnrollments: 0,
        activeStudents: 0,
        topPerformers: [],
        enrollmentsByTwoWeeks: [],
        courseDistribution: [],
        courses: []
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [user?.orgId]);
  // Enhanced color palette for charts
  const COLORS = [
    theme.palette.primary.main, 
    '#0088FE', 
    '#00C49F', 
    '#FFBB28', 
    '#FF8042',
    '#8884d8',
    '#4CAF50',
    '#FF5722'
  ];
  
  return (
    <Stack direction={"column"} gap={3} sx={{paddingY:'26px', width:"100%", marginX:"auto"}}>
      <Box sx={{
        background: `linear-gradient(90deg, ${theme.palette.primary.main}22, ${theme.palette.primary.main}00)`,
        borderRadius: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary" sx={{ 
            pl: 2, 
            borderLeft: `4px solid ${theme.palette.primary.main}`,
            textShadow: '0px 1px 2px rgba(0,0,0,0.05)'
          }}>
            Students Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ pl: 2, color: theme.palette.text.secondary, mt: 0.5 }}>
            Comprehensive overview of student enrollment and performance
          </Typography>
        </Box>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          p: 1.5, 
          bgcolor: 'white', 
          borderRadius: 2,
          boxShadow: '0px 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="body2" color="text.secondary">Last Updated:</Typography>
          <Typography variant="body2" fontWeight="bold">{new Date().toLocaleDateString()}</Typography>
        </Box>
      </Box>
      
      {/* Statistics Cards */}
      {!showTable && (
        <Box sx={{ mb: 3 }}>
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {/* Total Students Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={4} sx={{ 
                p: 0, 
                borderRadius: 4, 
                height: '100%', 
                background: 'linear-gradient(135deg, #6366F1, #4F46E5)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(79, 70, 229, 0.4)'
                }
              }}>
                {/* Decorative elements */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: -30, 
                  right: -20, 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)' 
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -40, 
                  left: -30, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)' 
                }} />
                
                {/* Card content */}
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 3 
                  }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: '14px', 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <GroupIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      STUDENTS
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  
                  <Typography 
                    variant="h2" 
                    fontWeight="800" 
                    color="white" 
                    sx={{ 
                      textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                      fontSize: '3.5rem',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    {stats.totalStudents}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.75)', 
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#A5B4FC',
                        display: 'inline-block'
                      }} 
                    />
                    Unique students across all courses
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            {/* Total Enrollments Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={4} sx={{ 
                p: 0, 
                borderRadius: 4, 
                height: '100%', 
                background: 'linear-gradient(135deg, #F59E0B, #D97706)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(217, 119, 6, 0.4)'
                }
              }}>
                {/* Decorative elements */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: -30, 
                  right: -20, 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)' 
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -40, 
                  left: -30, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)' 
                }} />
                
                {/* Card content */}
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 3 
                  }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: '14px', 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <SchoolIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      ENROLLMENTS
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  
                  <Typography 
                    variant="h2" 
                    fontWeight="800" 
                    color="white" 
                    sx={{ 
                      textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                      fontSize: '3.5rem',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    {stats.totalEnrollments}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.75)', 
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#FCD34D',
                        display: 'inline-block'
                      }} 
                    />
                    Total course enrollments
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            {/* Active Students Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={4} sx={{ 
                p: 0, 
                borderRadius: 4, 
                height: '100%', 
                background: 'linear-gradient(135deg, #10B981, #047857)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(4, 120, 87, 0.4)'
                }
              }}>
                {/* Decorative elements */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: -30, 
                  right: -20, 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)' 
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -40, 
                  left: -30, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)' 
                }} />
                
                {/* Card content */}
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 3 
                  }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: '14px', 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <TrendingUpIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      ACTIVE
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  
                  <Typography 
                    variant="h2" 
                    fontWeight="800" 
                    color="white" 
                    sx={{ 
                      textShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                      fontSize: '3.5rem',
                      lineHeight: 1,
                      mb: 1
                    }}
                  >
                    {stats.activeStudents}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'rgba(255,255,255,0.75)', 
                      fontWeight: 500,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5
                    }}
                  >
                    <Box 
                      component="span" 
                      sx={{ 
                        width: 8, 
                        height: 8, 
                        borderRadius: '50%', 
                        bgcolor: '#6EE7B7',
                        display: 'inline-block'
                      }} 
                    />
                    Enrolled in the last 30 days
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            
            {/* Top Performer Card */}
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={4} sx={{ 
                p: 0, 
                borderRadius: 4, 
                height: '100%', 
                background: 'linear-gradient(135deg, #EC4899, #BE185D)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 20px rgba(190, 24, 93, 0.4)'
                }
              }}>
                {/* Decorative elements */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: -30, 
                  right: -20, 
                  width: 150, 
                  height: 150, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.1)' 
                }} />
                <Box sx={{ 
                  position: 'absolute', 
                  bottom: -40, 
                  left: -30, 
                  width: 120, 
                  height: 120, 
                  borderRadius: '50%', 
                  background: 'rgba(255,255,255,0.05)' 
                }} />
                
                {/* Card content */}
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 1, 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    mb: 3 
                  }}>
                    <Box sx={{ 
                      p: 1.5, 
                      borderRadius: '14px', 
                      bgcolor: 'rgba(255,255,255,0.15)', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}>
                      <EmojiEventsIcon sx={{ color: 'white', fontSize: 30 }} />
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'rgba(255,255,255,0.85)', 
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.85rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      TOP
                    </Typography>
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }} />
                  
                  {stats.topPerformers && stats.topPerformers.length > 0 ? (
                    <>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        mb: 1.5,
                        mt: 2
                      }}>
                        <Avatar 
                          src={stats.topPerformers[0].profilePic || undefined} 
                          alt={stats.topPerformers[0].name}
                          sx={{ 
                            width: 48, 
                            height: 48, 
                            mr: 2,
                            border: '2px solid rgba(255,255,255,0.6)',
                            bgcolor: '#F472B6',
                            color: 'white',
                            fontWeight: 'bold'
                          }}
                        >
                          {!stats.topPerformers[0].profilePic && stats.topPerformers[0].name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography 
                            variant="h5" 
                            fontWeight="700" 
                            color="white"
                            sx={{ lineHeight: 1.1 }}
                          >
                            {stats.topPerformers[0].name}
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.8)', 
                              fontWeight: 600,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              mt: 0.5
                            }}
                          >
                            <Box 
                              component="span" 
                              sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                bgcolor: '#F9A8D4',
                                display: 'inline-block'
                              }} 
                            />
                            {stats.topPerformers[0].points} points
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                      <Typography 
                        variant="body1" 
                        color="white" 
                        sx={{ 
                          fontWeight: 500,
                          opacity: 0.9,
                          fontSize: '1.1rem'
                        }}
                      >
                        No data available
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'rgba(255,255,255,0.6)', 
                          mt: 1,
                          fontSize: '0.9rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 0.5
                        }}
                      >
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: '#F9A8D4',
                            display: 'inline-block'
                          }} 
                        />
                        Waiting for student activity
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
                    {/* Charts Row */}
          <Grid container spacing={3}>
            {/* Enrollment Trend Chart */}
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ 
                p: 3, 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ 
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                    pl: 2,
                    py: 0.5
                  }}>
                    Enrollment Trends
                  </Typography>
                  <Chip 
                    label="Last 2 Weeks" 
                    size="small" 
                    color="primary" 
                    variant="outlined" 
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stats.enrollmentsByTwoWeeks || []}
                      margin={{ top: 10, right: 30, left: 20, bottom: 15 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill:"black", fontSize: 12 }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={{ stroke: '#e0e0e0' }}
                      />
                      <YAxis 
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12 }}
                        axisLine={{ stroke: '#e0e0e0' }}
                        tickLine={{ stroke: '#e0e0e0' }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: 8, 
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                          border: 'none'
                        }}
                        cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                      />
                      <Legend 
                        wrapperStyle={{ paddingTop: 10 }}
                        formatter={(value) => <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>{value}</span>}
                      />
                      <Bar 
                        dataKey="enrollments" 
                        name="Enrollments" 
                        radius={[4, 4, 0, 0]}
                        barSize={35}
                      >
                        {stats.enrollmentsByTwoWeeks && stats.enrollmentsByTwoWeeks.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={`${theme.palette.primary.main}${90 - index * 10}`} 
                            stroke={theme.palette.primary.main}
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
            
            {/* Course Distribution Chart */}
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ 
                p: 3, 
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                height: '100%',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" fontWeight="bold" sx={{ 
                    borderLeft: `4px solid ${theme.palette.secondary.main}`,
                    pl: 2,
                    py: 0.5
                  }}>
                    Course Distribution
                  </Typography>
                  <Chip 
                    label={`${stats.courseDistribution.length} Courses`} 
                    size="small" 
                    color="secondary" 
                    variant="outlined" 
                    sx={{ fontWeight: 'bold' }}
                  />
                </Box>
                <Box sx={{ height: 300, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {stats.courseDistribution.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.courseDistribution || []}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          innerRadius={40}
                          paddingAngle={3}
                          fill="#8884d8"
                          dataKey="students"
                          nameKey="name"
                          label={({ name, percent }) => 
                            percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                        >
                          {stats.courseDistribution && stats.courseDistribution.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={COLORS[Math.floor(index % COLORS.length)]} 
                              stroke="white"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: 8, 
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            border: 'none'
                          }}
                          formatter={(value, name, props) => [
                            <span style={{ fontWeight: 'bold', color: props.fill }}>{value} students</span>, 
                            <span style={{ color: theme.palette.text.secondary }}>{name}</span>
                          ]}
                        />
                        <Legend 
                          layout="vertical"
                          verticalAlign="middle"
                          align="right"
                          wrapperStyle={{ fontSize: 12, paddingLeft: 20 }}
                          formatter={(value, entry) => (
                            <span style={{ color: theme.palette.text.primary, fontWeight: 500 }}>
                              {value.length > 15 ? `${value.substring(0, 15)}...` : value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <SchoolIcon sx={{ fontSize: 60, color: theme.palette.grey[300], mb: 2 }} />
                      <Typography variant="body1" align="center" color="text.secondary">
                        No course data available
                      </Typography>
                    </Box>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* Top Performers List */}
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h6" fontWeight="bold" mb={2}>Top Performers</Typography>
                <Grid container spacing={2}>
                  {stats.topPerformers && stats.topPerformers.length > 0 ? stats.topPerformers.map((performer, index) => (
                    <Grid item xs={12} sm={6} md={2.4} key={performer.id}>
                      <Card elevation={1} sx={{ borderRadius: 2, position: 'relative', overflow: 'visible' }}>
                        <Box sx={{ 
                          position: 'absolute', 
                          top: -15, 
                          left: 16, 
                          bgcolor: COLORS[index % COLORS.length],
                          color: 'white',
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          boxShadow: 2
                        }}>
                          {index + 1}
                        </Box>
                        <CardContent sx={{ pt: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar
                              src={performer.profilePic || undefined}
                              alt={performer.name}
                              sx={{ 
                                width: 40, 
                                height: 40, 
                                mr: 1,
                                bgcolor: COLORS[index % COLORS.length],
                                color: 'white',
                                fontWeight: 'bold'
                              }}
                            >
                              {!performer.profilePic && performer.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <Typography variant="subtitle1" fontWeight="bold" noWrap>
                              {performer.name}
                            </Typography>
                          </Box>
                          <Chip 
                            label={`${performer.points} points`} 
                            size="small" 
                            color="primary" 
                            variant="outlined" 
                            sx={{ mt: 1 }}
                          />
                        </CardContent>
                      </Card>
                    </Grid>
                  )) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" align="center">No top performers data available</Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
      
      {/* Search and Course Selection */}
      <Tools setSearchTerm={setSearch}/>
      
      {showTable ? (
        <Box sx={{display:"flex", flexDirection:"column", gap:"10px", alignItems:"flex-start"}}>
          <Button 
            onClick={() => {setShowTable(false)}} 
            variant="outlined" 
            color="primary"
            startIcon={<SchoolIcon />}
            sx={{marginLeft:"14px", mb: 2}}
          >
            Back to Courses
          </Button>
          <UsersTable courseId={currentCourse}/>
        </Box>
      ) : (
        <Box sx={{ mb: 3 }}>
          <CourseSwipeCard search={search} openTable={open}/>
        </Box>
      )}
      

    </Stack>
  )
}
