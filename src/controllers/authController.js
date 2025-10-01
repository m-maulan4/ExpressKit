import { userModel } from "../models/usersModel.js";

export const authRegis = async (req, res) => {
  const { fullname, username, password } = req.body;
  if (!fullname || !username || !password) {
    return res
      .status(400)
      .send({ msg: "Harap Full Name, Username, dan Password diisi!" });
  }
  try {
    await userModel.create({ fullname, username, password });
    res.send({ msg: "Berhasil ditambahkan" });
  } catch (error) {
    console.error(error);
  }
};
