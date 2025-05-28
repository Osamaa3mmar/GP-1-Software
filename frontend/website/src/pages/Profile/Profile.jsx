import Grid from "@mui/material/Grid2";
import { useParams } from "react-router-dom";
import LeftComponent from "../../component/Profile/LeftComponent/LeftComponent";
import RightComponent from "../../component/Profile/RightComponent/RightComponent";
import { Container, Typography, CircularProgress, Box } from "@mui/material";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../Context/userContext";
import { toast } from "react-toastify";

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUser = async () => {
    try {
      setLoading(true);
      // If no ID is provided, use the current logged-in user
      const userId = id || currentUser?.id;
      
      if (!userId) {
        setError("No user ID provided");
        setLoading(false);
        return;
      }

      // Use the token-based authentication format
      const { data } = await axios.get(`http://localhost:4545/user/${userId}`, {
        headers: {
          token: localStorage.getItem("token")
        }
      });
      
      console.log("User data response:", data);
      
      if (data.user) {
        setUser(data.user);
      } else {
        setError("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Failed to load user profile");
      toast.error("Failed to load user profile: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [id, currentUser]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <Typography variant="h5" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4} sx={{ py: 5 }}>
        <Grid xs={12} md={4}>
          <LeftComponent user={user} isCurrentUser={!id || id === currentUser?.id} />
        </Grid>
        <Grid xs={12} md={8}>
          <RightComponent user={user} isCurrentUser={!id || id === currentUser?.id} />
        </Grid>
      </Grid>
    </Container>
  );
}
