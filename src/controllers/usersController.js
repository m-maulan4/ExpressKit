import { userModel } from "../models/usersModel.js";

export const getUsers = async (req, res) => {
  const users = await userModel.findAll();
  res.send(users);
};
