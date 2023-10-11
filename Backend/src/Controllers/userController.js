import bcryptjs from "bcryptjs";
const { hashSync } = bcryptjs;
import UserModel from "../Models/userModel.js";
import { filterFields } from "../utils/filterFields.js";
import jwt from "jsonwebtoken";

// user/sign-up route POST
export const signUp = async (req, res, next) => {
  let filteredFields = filterFields({
    reqBody: req.body,
    schema: UserModel,
    skip: ["password"],
    required: ["password", "name", "phoneNumber"],
  });
  //hashing the password
  let hash = await hashSync(req.body.password);

  let user = new UserModel({ ...filteredFields, password: hash });
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "user created successfully" });
};

// user/sign-in route GET   sign-in with phone and password
export const signIn = async (req, res, next) => {
  let filteredData = filterFields({
    reqBody: req.body,
    schema: UserModel,
    skip: [],
    required: ["phoneNumber", "password"],
  });
  const user = await UserModel.findOne({
    phoneNumber: filteredData?.phoneNumber,
  });
  if (!user) return next(new ErrorHandler("Incorrect Credentials", 400));
  const passwordMatched = await user.comparePassword(filteredData?.password);
  if (!passwordMatched) {
    return next(new ErrorHandler("Incorrect Credentials", 400));
  }
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  return res
    .set({ "Access-Control-Expose-Headers": "auth_token" })
    .header("auth_token", token)
    .json({ success: true, user });
};

//user/me ROUTE GET
export const me = async (req, res, next) => {
  return res.status(200).json({ success: true, user: req?.user });
};