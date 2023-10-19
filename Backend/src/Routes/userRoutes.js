import { Router } from "express";
import { me, signIn, signUp } from "../Controllers/userController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
const router = Router();
router.post("/sign-up", signUp);
router.post("/sign-in", signIn);
router.get("/me", checkLogin, me);

export default router;
