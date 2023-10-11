import { Router } from "express";
import { GetExpenseHistory } from "../Controllers/ExpenseController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
const router = Router();
router.get("/get-income-history", checkLogin, GetExpenseHistory);

export default router;