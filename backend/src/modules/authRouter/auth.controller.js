import { Op } from "sequelize";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
import bcrypt from "bcryptjs"
export const signUp = async (req, res) => {
  try {
    const { username, email, password ,profile} = req.body;
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
    const hash= bcrypt.hashSync(password,8);
    const user = await userModel.create({ username, email, password:hash ,profilePic:profile?profile:"default.png"});
    if (user)
      return res.status(201).json({ message: "User created successfully." ,id:user.id});
    else {
      return res.status(400).json({ message: "error line 24 auth controller" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "server error in line 27 in auth Controller", error });
  }
};





export const choseAccountType=async (req,res)=>{
  try{
    const {id,answer}=req.body;
      const user=await userModel.findOne({where:{id}});
      if(user){
        user.role=answer;
        await user.save();
        return res.status(200).json({ message: `Account type changed to:(${answer})`});
      }
      else{
        return res.status(404).json({ message: "User not found" });
      }
    
  }catch(error){
    return res.status(500).json({ message: "server error", error:error.message });
  }
}