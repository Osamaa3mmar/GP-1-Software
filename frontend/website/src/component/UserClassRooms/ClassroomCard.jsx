// components/ClassroomCard.jsx
import { useNavigate } from "react-router-dom";
import { Card, CardMedia, Box, Typography, styled, Chip, Stack } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClassIcon from "@mui/icons-material/Class";
import PropTypes from "prop-types";
import LessonAccordions from "./LessonAccordions";

const StatusChip = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1.5),
  right: theme.spacing(1.5),
  fontWeight: 600,
  backdropFilter: "blur(4px)",
}));

export default function ClassroomCard({ classroom }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/classrooms/${classroom.id}`);
  };

  return (
    <Box
      sx={{
        m: 2,
        width: "100%",
        maxWidth: 360,
        position: "relative",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
          cursor: "pointer",
        },
      }}
      onClick={handleCardClick}
    >
      <Card sx={{ 
        borderRadius: 4,
        height: 420,
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, #f8f9fa 100%)'
      }}>
        <CardMedia
          component="img"
          height="160"
          image={classroom.thumbnail}
          alt={classroom.title}
          sx={{ 
            objectFit: "cover",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16
          }}
        />

        <Box sx={{ p: 2.5, flexGrow: 1 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
            <Typography variant="h6" fontWeight="600">
              {classroom.title}
            </Typography>
            <StatusChip 
              label={classroom.status || 'Active'} 
              color={classroom.status === 'Completed' ? 'success' : 'primary'}
              variant="outlined"
            />
          </Stack>

          <Typography variant="body2" color="text.secondary" mb={2}>
            {classroom.courseCode} • {classroom.instructor}
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <ClassIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {classroom.lessons?.length} Lessons
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={0.5}>
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2">
                {classroom.duration}
              </Typography>
            </Stack>
          </Stack>

          <Typography variant="body2" sx={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            color: 'text.secondary'
          }}>
            {classroom.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

ClassroomCard.propTypes = {
  classroom: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    courseCode: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        recordingLink: PropTypes.string,
        quizLink: PropTypes.string,
        duration: PropTypes.string
      })
    ).isRequired,
    status: PropTypes.oneOf(['Active', 'Completed', 'Upcoming'])
  }).isRequired,
};