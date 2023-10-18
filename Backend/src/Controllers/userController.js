import bcryptjs from "bcryptjs";
const { hashSync } = bcryptjs;
import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

// user/sign-up route POST
export const signUp = async (req, res, next) => {
  console.log(req.body);
 
  //hashing the password
  let hash = await hashSync(req.body.password);

  let user = new UserModel({ ...req.body, password: hash });
  await user.save();

   res
    .status(200)
    .json({ success: true, message: "user created successfully" });
};

// user/sign-in route GET   sign-in with phone and password
export const signIn = async (req, res, next) => {
  
  try{
  const user = await UserModel.findOne({
    email: req.body?.email,
  });
  if (!user){
    res.status(200).json({message:"Incorrect details",status:400})};
  const passwordMatched = await user.comparePassword(req.body?.password);
  if (!passwordMatched) {
    res.status(200).json({message:"Incorrect details",status:400})};
  
  const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

   res
    .set({ "Access-Control-Expose-Headers": "auth_token" })
    .header("auth_token", token)
    .json({ success: true, user });
  }
  catch(e)
  {
    console.log(e)
  }
};

//user/me ROUTE GET
export const me = async (req, res, next) => {
   res.status(200).json({ success: true, user: req?.user });
};
