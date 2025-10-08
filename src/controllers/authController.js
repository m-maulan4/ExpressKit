import { userModel } from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { log } from "console";

export const authRegis = async (req, res) => {
  const { fullname, username, password } = req.body;
  if (!fullname || !username || !password) {
    return res
      .status(400)
      .send({ msg: "Harap Full Name, Username, dan Password diisi" });
  }
  const checkUsername = await userModel.findOne({ username });
  if (checkUsername) {
    return res.status(400).send({ msg: "Username sudah digunakan" });
  }
  try {
    await userModel.create({ fullname, username, password });
    res.send({ msg: "Berhasil ditambahkan" });
  } catch (error) {
    res.status(400).send({ msg: "Error" });
  }
};

export const authLogin = async (req, res) => {
  if (!req.body)
    return res.status(401).send({ msg: "Username dan Password tidak valid" });
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(401).send({ msg: "Username dan Password tidak valid" });
  }
  const user = await userModel.findOne({ where: { username } });
  if (!user) {
    return res.status(401).send({ msg: "Username tidak terdaftar" });
  }
  const passCompare = await bcrypt.compare(password, user.password);
  if (!passCompare) {
    return res.status(401).json({
      msg: "password salah",
    });
  }
  try {
    const payload = { id: user.id, username: user.username };
    const refresh_token = jwt.sign(payload, process.env.REFRESH_TOKEN, {
      expiresIn: "7d",
    });
    const access_token = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    const token_user = crypto
      .createHash("sha256")
      .update(username)
      .digest("hex");
    await user.update({ refresh_token });
    res
      .cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: false, // set true jika pakai https
        path: "/",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", access_token, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        maxAge: 15 * 60 * 60 * 1000,
      });
    res.json({ username, token_user });
  } catch (error) {
    console.log(error);
  }
};

export const authLogout = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  const user = await userModel
    .findOne({
      where: { refresh_token: refresh_token },
    })
    .finally();

  await user.update({ refresh_token: null });

  res
    .clearCookie("refresh_token")
    .clearCookie("access_token")
    .json({ msg: "Berhasil keluar" });
};

export const authToken = async (req, res) => {
  const refresh_token = req.cookies.refresh_token;
  if (!refresh_token)
    return res.status(403).json({ msg: "Login terlebih dahulu" });
  jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (err, user) => {
    if (err) return res.status(403).json({ msg: "Login terlebih dahulu" });
    const newAccessToken = jwt.sign(
      { id: user.id, username: user.username },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );

    const token_user = crypto
      .createHash("sha256")
      .update(user.username)
      .digest("hex");
    res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
        maxAge: 15 * 60 * 60 * 1000,
      })
      .json({ username: user.username, token_user });
  });
};
