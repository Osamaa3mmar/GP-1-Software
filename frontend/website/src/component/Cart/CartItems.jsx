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
  Chip,
  Rating,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupIcon from "@mui/icons-material/Group";
import { useCart } from "../../contexts/CartContext";

const CartItems = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();

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
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: 200, objectFit: "cover" }}
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
                    {item?.course?.tags?.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>

                  {/* Title and Teacher */}
                  <Typography variant="h6" gutterBottom>
                    {item?.course?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {item?.course?.teacher?.username}
                  </Typography>

                  {/* Stats */}
                  <Box sx={{ display: "flex", gap: 2, my: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <AccessTimeIcon sx={{ fontSize: 18, mr: 0.5 }} />
                      <Typography variant="body2">
                        {item?.course?.duration}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <GroupIcon sx={{ fontSize: 18, mr: 0.5 }} />
                      <Typography variant="body2">
                        {item?.course?.enrollmentNumber} students
                      </Typography>
                    </Box>
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
                      ({item?.course?.reviewCount || 0} reviews)
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
        <Typography variant="h5">Total: ${getCartTotal().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" size="large">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartItems;
