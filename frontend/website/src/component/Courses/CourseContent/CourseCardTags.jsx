import { Chip, Stack } from "@mui/material";

export default function CourseCardTags() {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <Chip label="HTML" variant="outlined" color="primary" size="small" />
      <Chip label="CSS" variant="outlined" color="primary" size="small" />
      <Chip label="JS" variant="outlined" color="primary" size="small" />
    </Stack>
  );
}
