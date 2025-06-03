// components/CartItems.jsx
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Box,
  IconButton,
  Divider,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CourseCardStats from "../Courses/CourseContent/CourseCardStats";
import CourseCardTags  from "../Courses/CourseContent/CourseCardTags";
import { useCart } from "../../contexts/CartContext";
import CourseSchedule from "../Courses/CourseSchedule";
import { useNavigate } from "react-router-dom";
import CourseCardHeader from "../Courses/CourseContent/CourseCardHeader";

const CartItems = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Your Cart ({cartItems.length})
      </Typography>
      <Grid container spacing={3}>
        {cartItems.map((item, index) => (
          <Grid item xs={12} key={`${item?.course?.id}-${index}`}>
            <Card
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "100%", sm: 200 },
                  height: { xs: 160, sm: "auto" },
                  objectFit: "cover",
                }}
                image={item?.course?.thumbnail}
                alt={item?.course?.title}
              />
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  {/* Tags */}
                  <Box sx={{ mb: 1 }}>
                    <CourseCardTags tags={item?.course?.tags} />
                  </Box>

                  {/* Title and Teacher */}
                  <Typography variant="h6" gutterBottom>
                    {item?.course?.title}
                  </Typography>
                  {/* <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {item?.course?.teacher?.username}
                  </Typography> */}
                  <CourseCardHeader teacher={item?.course?.teacher}/>

                  {/* Stats */}
                  <Box sx={{ display: "flex", gap: 2, my: 1 }}>
                    {/* <CourseCardStats 
                      duration={item?.course?.duration}
                      enrollmentNumber={item?.course?.enrollmentNumber}
                      schedule={item?.course?.schedule}/> */}
                  </Box>

                  {/* Rating */}
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                      value={item?.course?.rating || 0}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                    <Typography variant="body2">
                      ({item?.course?.rating?.count || 0} reviews)
                    </Typography>
                  </Box>
                </Box>

                {/* Price and Actions */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Typography variant="h6" color="primary">
                    ${item?.course?.price}
                  </Typography>
                  <Box>
                    <IconButton onClick={() => removeFromCart(item?.course?.id)}>
                      <DeleteIcon color="error" />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Total and Checkout */}
      <Divider sx={{ my: 3 }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          Total: ${getCartTotal().toFixed(2)}
        </Typography>
        <Button onClick={() => navigate("/main/checkout")} variant="contained" color="primary" size="large">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartItems;
