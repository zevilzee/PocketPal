import { Router } from "express";
import {
  GetExpense,
  GetExpenseHistory,
  createExpense,
  deleteExpense,
  updateExpense,
} from "../Controllers/ExpenseController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
const router = Router();
router.get("/get-expense-history", GetExpenseHistory);
router.post("/create-expense", createExpense);
router.patch("/update-expense/:id", updateExpense);
router.delete("/delete-expense/:id", deleteExpense);
router.get("/getExpense/:id", GetExpense);

export default router;
