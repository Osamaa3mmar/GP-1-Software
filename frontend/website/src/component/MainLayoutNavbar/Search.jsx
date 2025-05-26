import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  InputBase,
  List,
  ListItem,
  Paper,
  Avatar,
  Typography,
  Chip,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Rating from "@mui/material/Rating";
import { red } from "@mui/material/colors";

// Debounce function
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:4545/course/getall");
      const data = await response.json();
      if (data.courses) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const filteredCourses = courses.filter((course) => {
    if (!query) return false;
    const searchTerm = query.toLowerCase();
    const matchTitle = course.title.toLowerCase().includes(searchTerm);
    const matchTopics = course.tags?.topics?.some((topic) =>
      topic.toLowerCase().includes(searchTerm)
    );
    const matchCategory = course.tags?.category
      ?.toLowerCase()
      .includes(searchTerm);
    const matchTeacher = course.teacher?.username
      ?.toLowerCase()
      .includes(searchTerm);

    return matchTitle || matchTopics || matchCategory || matchTeacher;
  });

  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  const handleCourseClick = (courseId) => {
    navigate(`/main/course/${courseId}`);
    setQuery("");
    setIsFocused(false);
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: { xs: "100%", md: "600px" },
        width: "100%",
        flexGrow: 1,
      }}
    >
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
          placeholder="Search courses, topics, instructors..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          sx={{
            fontSize: "0.9rem",
            "& .MuiInputBase-input": {
              py: 0.5,
            },
          }}
        />
      </Box>

      {/* Search Results Dropdown */}
      {query && isFocused && (
        <Paper
          elevation={3}
          sx={{
            position: "absolute",
            width: "100%",
            maxHeight: "70vh",
            overflow: "auto",
            mt: 1.5,
            borderRadius: "12px",
            zIndex: 999, // Lowered z-index to appear under main page elements
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0, 0, 0, 0.12)",
            backgroundColor: "rgba(255, 255, 255, 0.98)", // Slightly transparent background
          }}
        >
          <List disablePadding>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress size={32} />
              </Box>
            ) : filteredCourses.length === 0 ? (
              <Box sx={{ p: 3, textAlign: "center" }}>
                <Typography color="text.secondary">No courses found</Typography>
              </Box>
            ) : (
              filteredCourses.map((course) => (
                <ListItem
                  button
                  key={course.id}
                  onMouseDown={() => handleCourseClick(course.id)}
                  sx={{
                    "&:hover": { backgroundColor: "action.hover" },
                    py: 1.5,
                    px: 2,
                    minHeight: 140,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Thumbnail */}
                    <Grid item sx={{ width: 180 }}>
                      <Box
                        component="img"
                        src={course.thumbnail}
                        alt={course.title}
                        sx={{
                          width: "100%",
                          height: 120,
                          borderRadius: 2,
                          objectFit: "cover",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                      />
                    </Grid>

                    {/* Course Info */}
                    <Grid item xs>
                      <Stack spacing={1}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {course.title}
                        </Typography>
                        {/* Tags */}{" "}
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ flexWrap: "wrap", gap: 0.5 }}
                        >
                          {course.tags?.category && (
                            <Chip
                              label={course.tags.category}
                              color="primary"
                              size="small"
                            />
                          )}
                          {course.tags?.topics
                            ?.slice(0, 2)
                            .map((topic, index) => (
                              <Chip
                                key={index}
                                label={topic}
                                variant="outlined"
                                size="small"
                                sx={{ color: "text.secondary" }}
                              />
                            ))}
                        </Stack>
                        {/* Duration & Enrollment */}
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography variant="body2" color="text.secondary">
                            {course.duration} weeks
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {course.enrollmentNumber} students
                          </Typography>
                        </Stack>
                        {/* Teacher Info */}{" "}
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              bgcolor: red[500],
                              fontSize: "0.8rem",
                            }}
                          >
                            {getInitials(course.teacher?.username || "")}
                          </Avatar>
                          <Typography variant="body2" color="text.secondary">
                            {course.teacher?.username}{" "}
                            {course.teacher?.specialization
                              ? `• ${course.teacher.specialization}`
                              : ""}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>

                    {/* Price & Rating */}
                    <Grid item sx={{ width: 100 }}>
                      <Stack spacing={1} alignItems="flex-end">
                        <Typography
                          variant="h6"
                          color="primary.main"
                          fontWeight="bold"
                        >
                          ${Number(course.price || 0).toFixed(2)}
                        </Typography>
                        <Stack alignItems="flex-end">
                          <Rating
                            value={Number(course.rating || 0)}
                            readOnly
                            size="small"
                            precision={0.5}
                          />
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
}
