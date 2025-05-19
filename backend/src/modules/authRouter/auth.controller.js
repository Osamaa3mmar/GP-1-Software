import { Op, where } from "sequelize";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import cloudinary from '../../utils/Claoudinary.js'
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
import { customAlphabet, nanoid } from "nanoid";
export const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await userModel.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (exist) {
      return res
        .status(400)
        .json({ message: "username or email already exists ." });
    }
    const hash = bcrypt.hashSync(password, 8);
    let secure_url=null;
    if(req.file){
    secure_url=await cloudinary.uploader.upload(req.file.path);
    }
        const user = await userModel.create({
      username,
      email,
      password: hash,
      profilePic: secure_url? secure_url.secure_url: "default.png",
    });
    if (user){
      return res
        .status(201)
        .json({ message: "User created successfully.", id: user.id,user });
    }
      return res.status(400).json({ message: "User not created" });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "server error in line 27 in auth Controller", error });
  }
};

export const choseAccountType = async (req, res) => {
  try {
    const { id, answer } = req.body;
    const user = await userModel.findOne({ where: { id } });
    if (user) {
      user.role = answer;
      await user.save();
      return res
        .status(200)
        .json({ message: `Account type changed to:(${answer})` });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};

export const sendConfirmationEmail = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const user = await userModel.findOne({ where: { id } });
      if (user) {
        if (user.verifyEmail) {
          return res.status(400).json({ message: "Email already verified." });
        }
        sendEmail(user.email, `
          <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
              <h2 style="color: #333;">Welcome to Thuraa!</h2>
              <p>Please confirm your email address by clicking the button below.</p>
              <a href=${"http://localhost:5173/auth/verify/"+id} style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
              <p>If you didn't sign up for this account, you can ignore this email.</p>
          </div>
      `,);
        user.sentVerifyEmail = true;
        await user.save();
        return res.status(200).json({
          message: "Verification email sent successfully(check email).",
        });
      }
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { id } = req.body;

    if (id) {
      const user = await userModel.findOne({ where: { id } });
      
      if (user) {
        if (user.sentVerifyEmail) {
          user.sentVerifyEmail = false;
          user.verifyEmail = true;
        if(user.role==='owner'){
          
            const org=await organizationModel.create({
              name:user.username+"_org",
              ownerId:user.id
            })
            user.orgId=org.id;
            if(!org){
              return res.status(500).json({message:"failed to create organization"});
            }
        }
       
          await user.save();
          return res
            .status(200)
            .json({ message: "Email verified successfully." });
        } else {
          return res.status(400).json({
            message:
              user.verifyEmail == false
                ? "Email not in the system "
                : "Email already verified .",
          });
        }
      }
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { password, email } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (user) {
      if (user.verifyEmail) {
        const check =await bcrypt.compare(password, user.password);
        if (check) {
          const { id, email, username, role,orgId } = user;
          await user.save();
          const token = jwt.sign({ id, email, username, role,orgId }, "GP1");
          return res.status(200).json({ message: "Login successful", token });
        }
        return res.status(400).json({ message: "Wrong password" });
      } else {
        return res.status(400).json({ message: "Email not verified" });
      }
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};


const generateRandomCode=(number)=>{
  const range="abcdefghijklmnopqrstuvwxyz1234567890";
  const nanoid=customAlphabet(range,number);
  return nanoid();
}

export const forgetPassword=async (req,res)=>{
  try{
    const {email}=req.body;
    const user=await userModel.findOne({ where:{email:email}});
    if(!user){
      return res.status(404).json({message:"Email not registered"});
    }
    if( user.resetCode){
      return res.status(200).json({message:"This email already requested password reset ."});
    }
    user.resetCode=true;
    const rand=generateRandomCode(6);
    user.code=rand;
    await user.save();
    sendEmail(email,`<h2>${rand}</h2>`);
    return res.status(200).json({message:"Check "+email+" inbox!",rand});

  }catch(error){
    return res
    .status(500)
    .json({ message: "Server error", error: error.message });
  }
}


export const resetPass=async (req,res)=>{
try{
  const {email,password,code}=req.body;
  if(!email|| !password || !code){
    return res.status(400).json({message:"Fill all data !"});
  }
  const user=await userModel.findOne({where:{email:email}});
  if(!user){
    return res.status(404).json({message:"Email not registered"});
  }
  if(user.resetCode){
    if(code==user.code){
      const hash = bcrypt.hashSync(password, 8);
      user.password=hash;
      user.code=null;
      user.resetCode=false;
      await user.save();
      return res.status(200).json({message:"Password changed !"});
    }
  }
    return res.status(400).json({message:"This email not request password reset ."});
  
}catch(error){
  return res
    .status(500)
    .json({ message: "Server error", error: error.message });
}
}