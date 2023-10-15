import { Router } from "express";
import { GetExpenseHistory, createExpense, deleteExpense, updateExpense } from "../Controllers/ExpenseController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
const router = Router();
router.get("/get-expense-history", checkLogin, GetExpenseHistory);
router.post("/create-expense",checkLogin,createExpense);
router.patch("/update-expense/:id",checkLogin,updateExpense);
router.delete("/delete-inome/:id",checkLogin,deleteExpense);


export default router;