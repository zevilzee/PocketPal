import { Router } from "express";
import {
  forgotPassword,
  me,
  signIn,
  signUp,
  updatePicture,
  updateUser,
} from "../Controllers/userController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
import { upload } from "../Middlewares/ImageUpload.js";
const router = Router();
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", checkLogin, me);
router.post("/forgot-password/:id", forgotPassword);
router.patch("/update-picture/:id", upload.single("image"), updatePicture);
router.patch("/update-user/:id", updateUser);

export default router;
