import {
  Box,
  Container,
  Avatar,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import SpecialHeading from "./SpecialHeading";
import { useEffect, useState } from "react";
import axios from "axios";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function TopStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4545/user/getTopStudents"
        );
        setStudents(data.students);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching top students:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading top students...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">Error loading students: {error}</Typography>
      </Box>
    );
  }

  // Function to get trophy color based on student rank
  const getTrophyColor = (index) => {
    switch (index) {
      case 0:
        return "#FFD700"; // Gold
      case 1:
        return "#C0C0C0"; // Silver
      case 2:
        return "#CD7F32"; // Bronze
      default:
        return "#A0A0A0"; // Gray for others
    }
  };

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <SpecialHeading>Top Students</SpecialHeading>
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            },
            gap: 3,
            px: { xs: 2, sm: 4 },
          }}
        >
          {students.map((student, index) => (
            <Card
              key={student.student.id}
              component="a"
              href={`/profile/${student.student.id}`}
              sx={{
                height: "100%",
                textDecoration: "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
                cursor: "pointer",
                bgcolor: "background.paper",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Avatar
                    src={
                      student.student.profilePic ||
                      `/team-0${(index % 5) + 1}${index === 4 ? ".png" : ".jpg"}`
                    }
                    alt={student.student.username}
                    sx={{
                      width: { xs: 80, sm: 100 },
                      height: { xs: 80, sm: 100 },
                      mx: "auto",
                      mb: 2,
                      boxShadow: 2,
                    }}
                  />{" "}
                  {index < 3 && (
                    <EmojiEventsIcon
                      sx={{
                        position: "absolute",
                        top: -10,
                        right: "30%",
                        color: getTrophyColor(index),
                        fontSize: 30,
                      }}
                    />
                  )}
                </Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    mb: 1,
                  }}
                >
                  {student.student.username}
                </Typography>
                {student.student.bio && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {student.student.bio}
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    color: "primary.main",
                    fontWeight: "medium",
                    mt: "auto",
                  }}
                >
                  {student.totalPoints} Points
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
