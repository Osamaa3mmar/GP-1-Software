import { Box, Chip } from "@mui/material";

export default function CourseCardTags({ tags }) {
  const topics = tags?.topics || ["HTML", "CSS", "JavaScript"];
  const category = tags?.category || "";

  return (
    <Box sx={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 0.5,
      mb: 1,
      maxWidth: 350, // Match card width
      '& .MuiChip-root': {
        maxWidth: 'calc(50% - 4px)', // Ensure chips don't overflow
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }}>
      {category && (
        <Chip
          label={category}
          variant="outlined"
          color="primary"
          size="small"
        />
      )}
      {Array.isArray(topics) &&
        topics.map((topic, index) => (
          <Chip
            key={index}
            label={topic}
            variant="outlined"
            color="primary"
            size="small"
          />
        ))}
    </Box>
  );
}