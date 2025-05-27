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

  // Function to get card style based on student rank
  const getCardStyle = (rank) => {
    switch (rank) {
      case "1st":
        return {
          borderColor: "#FFD700", // Gold
          borderWidth: 2,
          borderStyle: "solid",
          background: "linear-gradient(135deg, #fffde7 0%, #fff9c4 100%)",
          boxShadow: "0 8px 16px rgba(255, 215, 0, 0.2)"
        };
      case "2nd":
        return {
          borderColor: "#C0C0C0", // Silver
          borderWidth: 2,
          borderStyle: "solid",
          background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
          boxShadow: "0 8px 16px rgba(192, 192, 192, 0.2)"
        };
      case "3rd":
        return {
          borderColor: "#CD7F32", // Bronze
          borderWidth: 2,
          borderStyle: "solid",
          background: "linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)",
          boxShadow: "0 8px 16px rgba(205, 127, 50, 0.2)"
        };
      default:
        return {};
    }
  };
  
  // Function to get colors based on rank
  const getRankColors = (rank) => {
    switch (rank) {
      case "1st":
        return {
          badge: "#FFD700", // Gold badge
          text: "#B57614",  // Gold text
          border: "#FFD700", // Gold border
          divider: "rgba(255, 215, 0, 0.3)" // Gold divider
        };
      case "2nd":
        return {
          badge: "#C0C0C0", // Silver badge
          text: "#4F575E",  // Silver text
          border: "#C0C0C0", // Silver border
          divider: "rgba(192, 192, 192, 0.3)" // Silver divider
        };
      case "3rd":
        return {
          badge: "#CD7F32", // Bronze badge
          text: "#8B4513",  // Bronze text
          border: "#CD7F32", // Bronze border
          divider: "rgba(205, 127, 50, 0.3)" // Bronze divider
        };
      default:
        return {
          badge: "#A0A0A0",
          text: "#555555",
          border: "#A0A0A0",
          divider: "rgba(160, 160, 160, 0.3)"
        };
    }
  };

  // Prepare top three students with ranks
  const topThree = students.slice(0, 3).map((student, idx) => ({
    student,
    rank: idx === 0 ? "1st" : idx === 1 ? "2nd" : "3rd"
  }));
  
  // Sort for display: on mobile screens (xs), gold at top (1st, 2nd, 3rd)
  // On desktop (sm+), silver on left, gold in middle, bronze on right
  const displayOrder = [...topThree].sort((a, b) => {
    // Mobile order priority - this ensures gold is at the top on mobile
    const mobileOrder = { "1st": 1, "2nd": 2, "3rd": 3 };
    return mobileOrder[a.rank] - mobileOrder[b.rank];
  });

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <SpecialHeading>Top Students</SpecialHeading>
        <Box
          sx={{
            mt: 6,
            position: "relative",
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: { xs: "center", sm: "flex-end" },
            gap: { xs: 5, sm: 3 },
            px: { xs: 2, sm: 4 },
            maxWidth: "1000px",
            mx: "auto",
            minHeight: { xs: "auto", sm: "400px" }
          }}
        >
          {displayOrder.map(({ student, rank }) => {
            const colors = getRankColors(rank);
            // Mobile positions are by rendered order
            // Desktop position: silver (left), gold (middle), bronze (right)
            const positionStyle = {
              order: { xs: 0, sm: rank === "1st" ? 2 : rank === "2nd" ? 1 : 3 },
              zIndex: rank === "1st" ? 3 : 1,
              transform: rank === "1st" ? { xs: "none", sm: "translateY(-20px)" } : "none",
              width: { xs: "100%", sm: rank === "1st" ? "34%" : "30%" },
              maxWidth: { xs: "350px", sm: "none" }
            };
            
            return (
              <Box key={student.student.id} sx={{ ...positionStyle }}>
                <Card
                  component="a"
                  href={`/profile/${student.student.id}`}
                  sx={{
                    height: "100%",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 8,
                    },
                    cursor: "pointer",
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    overflow: "hidden",
                    ...getCardStyle(rank)
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
                    {/* Rank indicator at the top of card */}
                    <Box 
                      sx={{
                        position: "relative",
                        mb: 2,
                        mt: 1.5
                      }}
                    >
                      {/* Rank Badge */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: -20,
                          left: "50%",
                          transform: "translateX(-50%)",
                          bgcolor: colors.badge,
                          color: colors.text,
                          fontWeight: "bold",
                          fontSize: { xs: "1rem", sm: "1.2rem" },
                          px: 2.5,
                          py: 0.3,
                          borderRadius: "15px",
                          boxShadow: 2,
                          zIndex: 2,
                          width: "fit-content"
                        }}
                      >
                        {rank}
                      </Box>
                      <Avatar
                        src={
                          student.student.profilePic ||
                          `/team-0${(parseInt(rank.charAt(0)) % 3) + 1}.jpg`
                        }
                        alt={student.student.username}
                        sx={{
                          width: { xs: 90, sm: 110 },
                          height: { xs: 90, sm: 110 },
                          mx: "auto",
                          mt: 4,
                          mb: 1,
                          boxShadow: 3,
                          border: `3px solid ${colors.border}`
                        }}
                      />
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        fontSize: { xs: "1.1rem", sm: "1.3rem" },
                        mb: 1,
                        fontWeight: 600,
                        color: colors.text
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
                    <Box sx={{ 
                        position: "relative", 
                        mt: "auto", 
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: colors.divider
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.text,
                          fontWeight: "bold",
                          fontSize: { xs: "0.9rem", sm: "1rem" }
                        }}
                      >
                        {student.totalPoints} Points
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
