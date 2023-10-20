import { Router } from "express";
import {
  GetIncome,
  GetIncomeHistory,
} from "../Controllers/IncomeController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
import {
  createIncome,
  deleteIncome,
  updateIncome,
} from "../Controllers/IncomeController.js";
const router = Router();
router.get("/get-income-history", GetIncomeHistory);
router.post("/create-income", createIncome);
router.patch("/update-income/:id", updateIncome);
router.delete("/delete-inome/:id", deleteIncome);
router.get("/getIncome/:id", GetIncome);

export default router;
