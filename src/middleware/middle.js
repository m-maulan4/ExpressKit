import jwt from "jsonwebtoken";

const middle = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader && authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({ msg: "Access token tidak ditemukan" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN, async (err, user) => {
    if (err) {
      return res.status(401).json({ msg: "Token tidak valid" });
    }
    next();
  });
};

export default middle;
