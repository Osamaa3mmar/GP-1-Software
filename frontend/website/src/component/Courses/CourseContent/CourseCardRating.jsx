import { Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function CourseCardRating({ price }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        ${price}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating
          name="course-rating"
          value={4.5}
          precision={0.5}
          readOnly
          size="medium"
        />
        <Typography variant="body2" color="text.secondary">
          (1.2k)
        </Typography>
      </Stack>
    </Stack>
  );
}
