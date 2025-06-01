import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Card, CardContent, LinearProgress, Tooltip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import axios from 'axios';

export default function LearningStats({ userId }) {
  const [stats, setStats] = useState({
    totalPoints: 0,
    rank: 'Beginner',
    nextRankPoints: 100
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:4545/enrollments/user/points', {
          headers: { token }
        });
        
        // Adjust to match the new API response format
        setStats({
          totalPoints: data.totalPoints || 0,
          rank: data.rank || 'Beginner',
          nextRankPoints: getNextRankPoints(data.rank)
        });
      } catch (error) {
        console.error('Error fetching learning stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [userId]);

  // Helper function to get points needed for next rank
  const getNextRankPoints = (currentRank) => {
    const ranks = {
      'Beginner': 100,
      'Bronze Scholar': 500, 
      'Silver Scholar': 1000,
      'Gold Scholar': 2500,
      'Platinum Scholar': 5000,
      'Diamond Scholar': Infinity
    };
    
    return ranks[currentRank] || Infinity;
  };

  // Calculate progress percentage to next rank
  const calculateProgress = () => {
    if (stats.rank === 'Diamond') return 100;
    
    const rankThresholds = {
      'Beginner': 0,
      'Bronze': 100,
      'Silver': 500,
      'Gold': 1000,
      'Platinum': 2500
    };
    
    const currentThreshold = rankThresholds[stats.rank] || 0;
    const nextThreshold = stats.nextRankPoints;
    const pointsInCurrentLevel = stats.totalPoints - currentThreshold;
    const levelRange = nextThreshold - currentThreshold;
    
    return Math.floor((pointsInCurrentLevel / levelRange) * 100);
  };

  // Get the rank color
  const getRankColor = (rank) => {
    const colors = {
      'Beginner': '#607d8b',           // Blue Grey
      'Bronze Scholar': '#cd7f32',     // Bronze
      'Silver Scholar': '#c0c0c0',     // Silver
      'Gold Scholar': '#ffd700',       // Gold
      'Platinum Scholar': '#e5e4e2',   // Platinum
      'Diamond Scholar': '#b9f2ff'     // Diamond Blue
    };
    
    return colors[rank] || colors['Beginner'];
  };

  return (
    <Box sx={{ p: 2 }}>
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <EmojiEventsIcon sx={{ mr: 1, color: 'rgba(102, 94, 223, 1)' }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#333' }}>
            Learning Statistics
          </Typography>
          {loading && (
            <LinearProgress 
              sx={{ 
                width: '100%', 
                ml: 2, 
                borderRadius: 1, 
                height: 6 
              }} 
            />
          )}
        </Box>

        <Card 
          elevation={0}
          sx={{ 
            bgcolor: 'rgba(102, 94, 223, 0.05)', 
            borderRadius: 2,
            mb: 2
          }}
        >
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                Achievement Points
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'rgba(102, 94, 223, 1)' }}>
                {stats.totalPoints} pts
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box 
                sx={{ 
                  width: 16, 
                  height: 16, 
                  borderRadius: '50%', 
                  bgcolor: getRankColor(stats.rank),
                  border: '2px solid white',
                  boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                  mr: 1
                }}
              />
              <Typography variant="body2">
                Current Rank: <strong>{stats.rank}</strong>
              </Typography>
            </Box>
            
            {stats.rank !== 'Diamond' && (
              <Tooltip title={`${stats.totalPoints} / ${stats.nextRankPoints} points to next rank`}>
                <Box sx={{ width: '100%' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={calculateProgress()}
                    sx={{
                      height: 8,
                      borderRadius: 2,
                      bgcolor: 'rgba(0,0,0,0.1)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: getRankColor(stats.rank)
                      }
                    }}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {stats.totalPoints} pts
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stats.nextRankPoints} pts
                    </Typography>
                  </Box>
                </Box>
              </Tooltip>
            )}
          </CardContent>
        </Card>
        
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', textAlign: 'center' }}>
          Continue learning to earn more points and increase your rank!
        </Typography>
      </Paper>
    </Box>
  );
}
