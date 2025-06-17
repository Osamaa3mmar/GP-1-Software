import { where } from "sequelize";
import { cartModel } from "../../../DB/models/Cart/Cart.model.js";
import { cartCourseModel } from "../../../DB/models/CartCourseModel/CartCourse.model.js";
import { courseModel } from "../../../DB/models/CourseModel/course.model.js";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import { purchaseModel } from "../../../DB/models/purchase/purchase.js";
import { enrollmentModel } from "../../../DB/models/Enrollment/Enrollments.js";
import { makeNotification } from "../Notification/Notification.controller.js";
import Stripe from "stripe";
import { ConversitionModel } from "../../../DB/models/MessageSystem/Conversition.js";
const stripe = new Stripe("sk_test_51RaggCRjHx0ojiIow8YwXmi3YiMoFLqZmIyMYNl4MtGSdfWFS8RFo1QVgbZYOYzpk1sImeF2hotCXg0kN2ya4Q3Z00Jn5XaFMo"); // required

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
        attributes: [
          "id", "title", "price", "thumbnail", "tags",
          "numberRating", "rating", "enrollmentNumber", "teacherId","orgId"
        ],
        include: [{
          model: userModel,
          as: "teacher",
          attributes: ["orgId"] // assumes teacher has orgId
        }]
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

    // Enroll user, update course enrollmentNumber, and send notifications
    for (const item of courses) {
      const courseId = item.courseId;
      const isCourse = item.course;
      console.log(item.course.orgId,'here');
      const course=await courseModel.findByPk(courseId);      
      await enrollmentModel.create({
        studentId: user.id,
        courseId,
        progress: 0,
      });
      await ConversitionModel.findOrCreate({
        where:{
          userId:user.id,
          organizationId:isCourse.orgId,
          type:"s-o"
        }
      })
      await courseModel.increment(
        { enrollmentNumber: 1 },
        { where: { id: courseId } }
      );

      // Send notifications
      let message = `${user.username} Enroll in ${isCourse.title} Course.`;
      let actionUrl = "/main/profile/user/"+user.id;
      makeNotification("Enroll", "user", message, actionUrl,course.orgId,false, null);

      message = `Enrolled in ${isCourse.title} Course Success.`;
      actionUrl = "/main/course/" + courseId;
      makeNotification("Enroll", "user", message, actionUrl, null, false, user.id);
    }

    await cartCourseModel.destroy({ where: { cartId: cart.id } });
    await cart.destroy();

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
      return res.status(200).json({ message: "User is not enrolled in this course", enrolled: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};





export const payWithStripe=async(req,res)=>{
  try{
    const {products}=req.body;
    const lineItems=products.map((product)=>({
      price_data:{
        currency:"usd",
        product_data:{
          name:product.course.title,
          images:[product.course.thumbnail]
        },
        unit_amount:product.course.price*100,
      },
      quantity:1,
    }))
    const session=await stripe.checkout.sessions.create({
       payment_method_types:["card"],
    line_items:lineItems,
    mode:"payment",
    success_url:"http://localhost:5173/main/payment/status/success",
    cancel_url:"http://localhost:5173/main/payment/status/failed",
    })
      return res.status(200).json({message:"success",id:session.id});
  }catch(error){
    return res.status(500).json({ error: "Internal server error" });
  }
}