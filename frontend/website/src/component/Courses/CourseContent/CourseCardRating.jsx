import { Stack, Typography } from "@mui/material";
import Rating from "@mui/material/Rating";

export default function CourseCardRating({ price, rating }) {
  // Extract rating values safely
  const ratingValue = rating;
  const ratingCount = rating?.count;
  
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        ${price}
      </Typography>
      
      {ratingValue ? (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            name="course-rating"
            value={ratingValue}
            precision={0.5}
            readOnly
            size="medium"
          />
          {ratingCount > 0 && (
            <Typography variant="body2" color="text.secondary">
              {ratingCount >= 1000
                ? `${(ratingCount / 1000).toFixed(1)}k`
                : ratingCount}
            </Typography>
          )}
        </Stack>
      ) : (
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Not Rated
        </Typography>
      )}
    </Stack>
  );
}