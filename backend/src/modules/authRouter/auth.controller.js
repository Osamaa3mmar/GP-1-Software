import { Op } from "sequelize";
import { userModel } from "../../../DB/models/UserModel/user.model.js";
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
    const user = await userModel.create({ username, email, password ,profilePic:profile?profile:"default.png"});
    if (user)
      return res.status(201).json({ message: "User created successfully." ,user});
    else {
      return res.status(400).json({ message: "error line 24 auth controller" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "server error in line 27 in auth Controller", error });
  }
};
