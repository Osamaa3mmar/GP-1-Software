import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, InputBase, List, ListItem, Paper, Avatar, 
  Typography, Chip, Stack, Grid
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";

const expectedCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    thumbnail:
      "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["HTML", "CSS", "JavaScript"],
      category: "Web Development",
      level: "Beginner",
      prerequisites: ["Basic Computer Skills"],
    },
    learningOutcomes:
      "By the end of this course, you will be able to create responsive websites using HTML5, CSS3, and JavaScript. You will also understand web development best practices and be able to build real-world projects.",
    learningPath:
      "This course is part of the Web Development Bootcamp. After completing this course, you can proceed to the Advanced CSS Techniques course.",
    duration: 8,
    price: 99.99,
    enrollmentNumber: 156,
    teacher: { name: "John Doe", position: "Senior Web Developer" },
    isSchedulized: true,
    schedule: [
      { day: "Mon", startTime: "10:00 AM", endTime: "12:00 PM" },
      { day: "Wed", startTime: "10:00 AM", endTime: "12:00 PM" },
    ],
    rating: { value: 4.5, count: 1200 },
  },
  {
    id: 2,
    title: "Data Science with Python",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Pandas", "NumPy", "Machine Learning"],
      category: "Data Science",
      level: "Intermediate",
      prerequisites: ["Python Basics", "Statistics"],
    },
    learningOutcomes:
      "Gain the skills to analyze data, build machine learning models, and interpret results using Python libraries.",
    learningPath:
      "Follow this course with Deep Learning with TensorFlow for advanced AI topics.",
    duration: 12,
    price: 149.99,
    enrollmentNumber: 98,
    teacher: { name: "Sara Chen", position: "Data Scientist" },
    isSchedulized: true,
    schedule: [
      { day: "Tue", startTime: "2:00 PM", endTime: "4:00 PM" },
      { day: "Thu", startTime: "2:00 PM", endTime: "4:00 PM" },
    ],
    rating: { value: 4.7, count: 87 },
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["User Research", "Prototyping", "Figma"],
      category: "Design",
      level: "Beginner",
      prerequisites: ["None"],
    },
    learningOutcomes:
      "Understand user-centric design, wireframing, and prototyping using modern tools like Figma.",
    learningPath:
      "Leads into UX Research Methods or Advanced Figma for Designers courses.",
    duration: 6,
    price: 89.99,
    enrollmentNumber: 210,
    teacher: { name: "Alex Morgan", position: "UI/UX Designer" },
    isSchedulized: false,
    schedule: [],
    rating: { value: 4.3, count: 200 },
  },
  {
    id: 4,
    title: "Mobile App Development with Flutter",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Flutter", "Dart", "Mobile UI"],
      category: "Mobile Development",
      level: "Intermediate",
      prerequisites: ["OOP Concepts", "Basic UI Design"],
    },
    learningOutcomes:
      "Build native mobile apps for Android and iOS using a single codebase with Flutter.",
    learningPath:
      "Prepare for the Advanced Flutter Animations course after completion.",
    duration: 10,
    price: 129.99,
    enrollmentNumber: 134,
    teacher: { name: "Emily Nguyen", position: "Mobile Developer" },
    isSchedulized: true,
    schedule: [
      { day: "Sat", startTime: "9:00 AM", endTime: "12:00 PM" },
    ],
    rating: { value: 4.6, count: 110 },
  },
  {
    id: 5,
    title: "DevOps and Continuous Integration",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Docker", "CI/CD", "Jenkins"],
      category: "DevOps",
      level: "Advanced",
      prerequisites: ["Software Development Experience"],
    },
    learningOutcomes:
      "Learn how to implement CI/CD pipelines and automate deployments with Docker and Jenkins.",
    learningPath:
      "Next steps include Kubernetes and Infrastructure as Code.",
    duration: 14,
    price: 199.99,
    enrollmentNumber: 76,
    teacher: { name: "David Lee", position: "DevOps Engineer" },
    isSchedulized: true,
    schedule: [
      { day: "Mon", startTime: "6:00 PM", endTime: "8:00 PM" },
      { day: "Wed", startTime: "6:00 PM", endTime: "8:00 PM" },
    ],
    rating: { value: 4.8, count: 65 },
  },
  {
    id: 6,
    title: "Cybersecurity Essentials",
    thumbnail: "https://d2opxh93rbxzdn.cloudfront.net/original/2X/4/40cfa8ca1f24ac29cfebcb1460b5cafb213b6105.png",
    tags: {
      topics: ["Network Security", "Encryption", "Risk Management"],
      category: "Cybersecurity",
      level: "Beginner",
      prerequisites: ["Basic Networking Knowledge"],
    },
    learningOutcomes:
      "Understand the fundamentals of cybersecurity, threats, vulnerabilities, and how to protect systems.",
    learningPath:
      "After this course, consider Ethical Hacking and Penetration Testing.",
    duration: 9,
    price: 109.99,
    enrollmentNumber: 182,
    teacher: { name: "Fatima Al-Hassan", position: "Cybersecurity Analyst" },
    isSchedulized: false,
    schedule: [],
    rating: { value: 4.4, count: 95 },
  },
];

export default function CourseSearch() {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const filteredCourses = expectedCourses.filter(course => {
    const searchLower = query.toLowerCase();
    return (
      course.title.toLowerCase().includes(searchLower) ||
      course.tags.topics.some(topic => 
        topic.toLowerCase().includes(searchLower)
      )
    );
  });

  const getInitials = (name) => {
    return name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
      : "??";
  };

  const handleCourseClick = (courseId) => {
    navigate(`/main/course/${courseId}`);
    setQuery('');
    setIsFocused(false);
  };

  return (
    <Box sx={{ 
      position: 'relative', 
      maxWidth: { xs: '100%', md: '600px' },
      width: '100%',
      flexGrow: 1
    }}>
      {/* Search Input */}
      <Box
        sx={{
          padding: "8px 16px",
          borderRadius: "28px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          bgcolor: "#f5f5f5",
          "&:hover": { bgcolor: "#eeeeee" },
          transition: "background-color 0.2s ease",
        }}
      >
        <SearchIcon sx={{ color: "text.secondary", fontSize: 26 }} />
        <InputBase
          fullWidth
          placeholder="Search courses, resources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          sx={{
            fontSize: '0.9rem',
            '& .MuiInputBase-input': {
              py: 0.5,
            }
          }}
        />
      </Box>

      {/* Search Results Dropdown */}
      {query && isFocused && (
        <Paper 
          elevation={3}
          sx={{
            position: 'absolute',
            width: '100%',
            maxHeight: '70vh',
            overflow: 'auto',
            mt: 1.5,
            borderRadius: '12px',
            zIndex: 9999,
            border: '1px solid rgba(0, 0, 0, 0.12)'
          }}
        >
          <List disablePadding>
            {filteredCourses.map((course) => (
              <ListItem
                button
                key={course.id}
                onMouseDown={() => handleCourseClick(course.id)}
                sx={{
                  '&:hover': { backgroundColor: 'action.hover' },
                  py: 1.5,
                  px: 2,
                  minHeight: 140, // Changed to minHeight
                  borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <Grid container spacing={2} sx={{ height: '100%' }}>
                  {/* Thumbnail Column */}
                  <Grid item sx={{ 
                    width: 180,
                    height: 120, // Fixed height
                    alignSelf: 'center' // Center vertically
                  }}>
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: 8,
                        objectFit: 'cover',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                  </Grid>

                  {/* Main Content Column */}
                  <Grid item xs sx={{ 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    overflow: 'hidden',
                    height: 120, // Fixed height
                    alignSelf: 'center' // Center vertically
                  }}>
                    {/* Title and Tags */}
                    <div>
                      <Typography 
                        variant="subtitle1" 
                        fontWeight={600}
                        sx={{ 
                          mb: 0.5,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {course.title}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                        <Chip
                          label={course.tags.category}
                          variant="outlined"
                          color="primary"
                          size="small"
                          sx={{ mb: 0.5 }}
                        />
                        {course.tags.topics.slice(0, 2).map((topic, index) => (
                          <Chip
                            key={index}
                            label={topic}
                            variant="outlined"
                            size="small"
                            sx={{ 
                              mb: 0.5,
                              color: 'text.secondary',
                              borderColor: 'divider'
                            }}
                          />
                        ))}
                      </Stack>
                    </div>

                    {/* Instructor Info */}
                    <Stack 
                      direction="row" 
                      alignItems="center" 
                      spacing={1.5}
                      sx={{ mt: 'auto' }} // Push to bottom
                    >
                      <Avatar 
                        sx={{
                          bgcolor: red[500],
                          width: 30,
                          height: 30,
                          fontSize: '0.75rem',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }}
                      >
                        {getInitials(course.teacher?.name)}
                      </Avatar>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: 'text.secondary',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {course.teacher?.name}
                      </Typography>
                    </Stack>
                  </Grid>

                  {/* Price & Rating Column */}
                  <Grid item sx={{ 
                    width: 120,
                    height: 120, // Fixed height
                    alignSelf: 'center' // Center vertically
                  }}>
                    <Stack 
                      spacing={1} 
                      sx={{ 
                        height: '100%', 
                        justifyContent: 'space-between',
                        alignItems: 'flex-end'
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        fontWeight={700}
                        sx={{ color: 'primary.main' }}
                      >
                        ${course.price.toFixed(2)}
                      </Typography>
                      
                      <Stack 
                        spacing={0.5} 
                        alignItems="flex-end"
                        sx={{ mb: 'auto' }} // Push to bottom
                      >
                        <Rating
                          value={course.rating.value}
                          precision={0.5}
                          readOnly
                          size="medium"
                          sx={{ color: 'warning.main' }}
                        />
                        <Typography 
                          variant="caption"
                          sx={{ 
                            color: 'text.secondary',
                            lineHeight: 1.2
                          }}
                        >
                          ({course.rating.count.toLocaleString()})
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}