import { Chip, Stack } from "@mui/material";

export default function CourseCardTags({ tags }) {
  const topics = tags?.topics || ["HTML", "CSS", "JavaScript"];
  const category = tags?.category || "";

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
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
    </Stack>
  );
}
