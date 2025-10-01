import { userModel } from "../models/usersModel.js";

export const authRegis = async (req, res) => {
  const user = await userModel.findAll();
  return res.send(user);
};
