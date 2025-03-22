import { Op } from "sequelize";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import cloudinary from '../../utils/Claoudinary.js'
import { organizationModel } from "../../../DB/models/organaization/organaization.js";
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
        sendEmail(user.email,id);
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
          const { id, email, username, role } = user;
          await user.save();
          const token = jwt.sign({ id, email, username, role }, "GP1");
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
