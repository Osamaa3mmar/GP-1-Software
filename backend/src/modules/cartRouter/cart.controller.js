import { where } from "sequelize";
import { cartModel } from "../../../DB/models/Cart/Cart.model.js";
import { cartCourseModel } from "../../../DB/models/CartCourseModel/CartCourse.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";

export const getCart = async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await cartModel.findOne({
      where: { userId: user.id },
      attributes: ["id", "totalBeforeDiscount"],
      include: [
        {
          model: cartCourseModel,
          as: "courses",
          attributes: ["id", "priceAtAddTime"],
          include: [
            {
              model: courseModel,
              as: "course", 
              attributes: ["id", "title", "price", "thumbnail", "tags","numberRating","rating"],
              include:[
                {
                  model:userModel,
                  as:"teacher",
                  attributes:["id","profilePic","email","specialization"]
                }
              ]
            }
          ]
        }
      ]
    });

    return res.status(200).json({ message: "success", cart });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


export const addItemToCart=async(req,res)=>{
  try{
    const {user,courseId}=req.body;
    const [cart, created] = await cartModel.findOrCreate({
  where: { userId: user.id },
});
    const course=await courseModel.findByPk(courseId);
    if(!course){
      return res.status(404).json({ error: "Course not found" });
    }
    console.log(cart.id,"osama");
    const [cartItem, itemCreated] = await cartCourseModel.findOrCreate({
      where: { courseId, cartId:cart.id },
      defaults: {
        cartId: cart.id,
        courseId, 
        priceAtAddTime: course.price 
      }
    })
    if(!itemCreated){
      return res.status(400).json({ error: "Item already exists in cart" });
    }
    cart.totalBeforeDiscount += course.price;
    await cart.save();
    return res.status(200).json({message:"Item added to cart successfully",cart});
  }catch(error){
    return res.status(500).json({ error: "Internal server error" });
  }
}


export const removeItem=async(req,res)=>{
  try{
    const {user,courseId}=req.body;
    const cart= await cartModel.findOne({
      where:{userId:user.id}
    })
    if(!cart){
      return res.status(404).json({ error: "Cart not found" });
    }
    const cartItem=await cartCourseModel.findOne({
      where:{courseId,cartId:cart.id}
    })
    if(!cartItem){
      return res.status(404).json({ error: "Item not found in cart" });
    }
    cart.totalBeforeDiscount -= cartItem.priceAtAddTime;
    await cart.save();
    await cartItem.destroy();
    return res.status(200).json({message:"Item removed from cart successfully",cart});
  }catch(error){
    return res.status(500).json({ error: "Internal server error" });
  }
}