import {
  Box,
  Container,
  Avatar,
  Typography,
  Rating,
  Card,
  CardContent,
} from "@mui/material";
import SpecialHeading from "./SpecialHeading";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TopCompanies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:4545/org/getTopOrganizations"
        );
        setCompanies(data.orgs);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching top organizations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography>Loading top companies...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 8, textAlign: "center" }}>
        <Typography color="error">Error loading companies: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <SpecialHeading>Top Organizations</SpecialHeading>{" "}
        <Box
          sx={{
            mt: 4,
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // 1 card per row on mobile
              sm: "repeat(2, 1fr)", // 2 cards per row on tablet
              md: "repeat(3, 1fr)", // 3 cards per row on desktop
              lg: "repeat(5, 1fr)", // 5 cards per row on large screens
            },
            gap: 3,
            px: { xs: 2, sm: 4 },
          }}
        >
          {companies.map((org) => (
            <Card
              key={org.id}
              component="a"
              href={`/organization/${org.id}`}
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
                <Avatar
                  src={org.profile}
                  alt={org.name}
                  sx={{
                    width: { xs: 80, sm: 100 },
                    height: { xs: 80, sm: 100 },
                    mx: "auto",
                    mb: 2,
                    boxShadow: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    mb: 1,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.5em",
                  }}
                >
                  {org.name}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  <Rating
                    value={Number(org.avgRating)}
                    precision={0.1}
                    readOnly
                    size="small"
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ ml: 1 }}
                  >
                    ({org.avgRating})
                  </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                  {org.description && (
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
                      {org.description}
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      color: "primary.main",
                      fontWeight: "medium",
                    }}
                  >
                    {org.courseCount} Active Courses
                  </Typography>
                  {org.isVerified && (
                    <Typography
                      variant="caption"
                      sx={{
                        display: "block",
                        color: "success.main",
                        mt: 1,
                      }}
                    >
                      ✓ Verified Organization
                    </Typography>
                  )}
                </Box>
              </CardContent>{" "}
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
