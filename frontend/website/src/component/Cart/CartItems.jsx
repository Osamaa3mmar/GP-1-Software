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
import CourseCardTags  from "../Courses/CourseContent/CourseCardTags";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import CourseCardHeader from "../Courses/CourseContent/CourseCardHeader";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { OsamaCartContext } from "../../Context/CartOsama";
const CartItems = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const {setCartCount,cartCount}=useContext(OsamaCartContext);
  const [loading, setLoading] = useState(false);
  const getCart=async()=>{
    try{
      const {data}=await axios.get("http://localhost:4545/cart/get",{
        headers:{
          token: localStorage.getItem("token"),
        }
      });
      console.log(data);
      setCart(data.cart);
    }catch(error){
      console.error("Error fetching cart items:", error);
    }
  }
  
  const removeFromCart = async (courseId) => {
    try{
      const {data}=await axios.delete("http://localhost:4545/cart/removeitem",{
        headers:{
          token: localStorage.getItem("token"),
        },
        data:{
          courseId
        }
      })
      console.log(data);
      setCartCount(cartCount-1);
      getCart();
    }catch(error){
      console.error("Error fetching cart items:", error);
    }
  }
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const purchase = async () => {
    try{
      setLoading(true);
      await delay(2000);
      const {data}=await axios.get("http://localhost:4545/cart/purchase",{
        headers:{
          token: localStorage.getItem("token"),
        }
      })
      console.log(data);
      toast.success("Purchase successful!");
      setCartCount(0);
      setCart(null);
      navigate("");
    }catch(error){
      console.error("Error during purchase:", error);
    }finally{
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getCart();
  },[]);
  
  if (!cart||cart?.courses?.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6">Your cart is empty</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Your Cart ({cart?.courses?.length})
      </Typography>
      <Grid container spacing={3}>
        {cart?.courses?.map((item, index) => (
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
                      ({item?.course?.numberRating || 0} reviews)
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
          Total: ${cart?.totalBeforeDiscount}
        </Typography>
        <Button loading={loading} onClick={purchase} variant="contained" color="primary" size="large">
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default CartItems;
