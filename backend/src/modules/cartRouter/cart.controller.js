import { where } from "sequelize";
import { cartModel } from "../../../DB/models/Cart/Cart.model.js";
import { cartCourseModel } from "../../../DB/models/CartCourseModel/CartCourse.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { purchaseModel } from "../../../DB/models/purchase/purchase.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";

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
                  attributes:["id","username","profilePic","email","specialization"]
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
    const enroll=await enrollmentModel.findOne({
      where:{
        studentId: user.id,
        courseId: courseId
      }
    })
    if(enroll){
      return res.status(200).json({ error: "You are already enrolled in this course",enroll:true });
    }
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


export const purchaseCourses = async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await cartModel.findOne({
      where: { userId: user.id },
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const courses = await cartCourseModel.findAll({
      where: { cartId: cart.id },
      include: [{
        model: courseModel,
        as: "course",
        attributes: ["id", "title", "price", "thumbnail", "tags", "numberRating", "rating", "enrollmentNumber"],
      }]
    });

    if (courses.length === 0) {
      return res.status(404).json({ error: "No courses in cart" });
    }

    const purchase = await purchaseModel.create({
      userId: user.id,
      totalBalance: cart.totalBeforeDiscount,
      courses
    });

    // Enroll user and update enrollment number
    for (const item of courses) {
      await enrollmentModel.create({
        studentId: user.id,
        courseId: item.courseId,
        progress: 0,
      });

      // Increment course enrollmentNumber by 1
      await courseModel.increment(
        { enrollmentNumber: 1 },
        { where: { id: item.courseId } }
      );
    }

    // Clear cart
    await cartCourseModel.destroy({ where: { cartId: cart.id } });
    await cart.destroy();

    // Create a new empty cart
    const newCart = await cartModel.create({
      userId: user.id,
      totalBeforeDiscount: 0,
    });

    return res.status(200).json({
      message: "Purchase successful and user enrolled",
      courses,
      cart,
      purchase
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const checkEnrollment = async (req, res) => {
  try {
    const { user } = req.body;
    const { courseId } = req.query;

    const enrollment = await enrollmentModel.findOne({
      where: {
        studentId: user.id,
        courseId: courseId
      }
    });

    if (enrollment) {
      return res.status(200).json({ message: "User is enrolled in this course", enrolled: true });
    } else {
      return res.status(404).json({ message: "User is not enrolled in this course", enrolled: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};