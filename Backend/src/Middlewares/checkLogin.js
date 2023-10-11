import jwt from "jsonwebtoken";
import UserModel from "../Models/userModel.js";
export const checkLogin = async (req, res, next) => {
  const verify = jwt.verify;
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verification = verify(token, process.env.JWT_SECRET);
    let user = await UserModel.findById(verification?.userId);
    if (!user) return res.status(402).send("Access Denied");
    req.user = user;
    next();
  } catch (err) {
    return res.status(400).send("Invalid Token");
  }
};