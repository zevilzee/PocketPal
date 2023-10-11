import { Router } from "express";
import { GetIncomeHistory } from "../Controllers/IncomeController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
const router = Router();
router.get("/get-income-history", checkLogin, GetIncomeHistory);

export default router;