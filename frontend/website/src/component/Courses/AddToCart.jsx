
import { Button, CardActions } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { OsamaCartContext } from "../../Context/CartOsama";

import { toast } from "react-toastify";
export default function AddToCart({ product }) {
  const {cartCount,setCartCount}=useContext(OsamaCartContext);
  console.log(product);
  const [enrolled, setEnrolled] = useState(false);
  const addToCartFunction = async()=>{
    try{
      const {data}=await axios.post("http://localhost:4545/cart/additem",{
        courseId: product.id,
      },{
        headers:{
          token: localStorage.getItem("token"),
        }
      })
      if(data.enroll){
        return toast.info("You are already enrolled in this course !");
      }
      console.log(data);
      setCartCount(cartCount+1);
      toast.success("Item added to cart successfully");
    }catch(error){
      console.log(error);
      toast.info("Item already exists in cart");
    }
  };
  const checkEnrollment = async () => {
    try {
      const { data } = await axios.get("http://localhost:4545/cart/checkenrollment", {
        headers: {
          token: localStorage.getItem("token"),
        },
        params: {
          courseId: product.id,
        },
      });
      console.log(data);
      setEnrolled(true);
    } catch (error) {
      console.error("Error checking enrollment:", error);
    }
  };
  useEffect(()=>{
    checkEnrollment();
  },[]);
  return (
    <CardActions sx={{ px: 2 , pb: 2 }}>
      {
        enrolled?
        <Button
          variant="outlined"
          fullWidth
          sx={{
            bgcolor: "secondary.main",
            color: "white",
            transition: "background-color 0.3s ease",
            "&:hover": { bgcolor: "secondary.dark" },
          }}
          disabled
        >
          Enrolled
        </Button>
        :
         <Button
        variant="contained"
        fullWidth
        sx={{
          bgcolor: "primary.main",
          transition: "background-color 0.3s ease",
          "&:hover": { bgcolor: "primary.dark" },
        }}
        onClick={addToCartFunction}
      >
        Add to Cart
      </Button>
      }
     
    </CardActions>
  );
}