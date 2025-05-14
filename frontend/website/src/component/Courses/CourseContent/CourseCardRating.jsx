import { Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function CourseCardRating({ price , rating}) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        ${price}
      </Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating
          name="course-rating"
          value={rating.value}
          precision={0.5}
          readOnly
          size="medium"
        />
        <Typography variant="body2" color="text.secondary">
          ({rating.count >= 1000
            ? `${(rating.count / 1000).toFixed(1)}k`
            : rating.count})
        </Typography>
      </Stack>
    </Stack>
  );
}
