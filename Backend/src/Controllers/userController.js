import bcryptjs from "bcryptjs";
const { hashSync } = bcryptjs;
import UserModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";

// user/sign-up route POST
export const signUp = async (req, res, next) => {
  console.log(req.body);

  //hashing the password

  let user = new UserModel({ ...req.body });
  await user.save();

  res.status(200).json({ success: true, message: "user created successfully" });
};

// user/sign-in route GET   sign-in with phone and password
export const signIn = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({
      email: req.body?.email,
      password: req.body?.password,
    });
    if (!user) {
      res.status(200).json({ message: "Incorrect details", status: 400 });
    }

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

    res
      .set({ "Access-Control-Expose-Headers": "auth_token" })
      .header("auth_token", token)
      .json({ success: true, user });
  } catch (e) {
    console.log(e);
  }
};

export const forgotPassword = async (req, res) => {
  console.log(req.body, req.params.id);
  try {
    let hash = await hashSync(req.body.password);
    const user = await UserModel.findOne({ phoneNumber: req.params.id });

    const newuser = await UserModel.findByIdAndUpdate(
      { _id: user._id },
      { password: req.body.password },
      { new: true }
    );
    console.log(user);
    res.send({ status: 200, messsage: newuser });
  } catch (e) {
    res.send({ status: 500, messsage: "Internal server error" });
  }
};

//user/me ROUTE GET
export const me = async (req, res, next) => {
  res.status(200).json({ success: true, user: req?.user });
};

export const updatePicture = async (req, res, next) => {
  console.log(req);
  if (!req.file) {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      },
      { new: true }
    );
    res.status(200).send(user);
    //res.status(400).send("Image not found");
  } else {
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        image: req.file.filename,
        ...req.body,
      },
      { new: true }
    );
    res.status(200).send(user);
  }
};

export const updateUser = async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.status(200).send(user);
};
