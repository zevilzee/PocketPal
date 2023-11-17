import { Router } from "express";
import {
  GetFinance,
  createFinance,
  updateFinance,
  deleteFinance,
  GetFinanceHistory,
} from "../Controllers/FinanceController.js";

const router = Router();
router.post("/create-finance", createFinance);
router.patch("/update-finance/:id", updateFinance);
router.delete("/delete-finance/:id", deleteFinance);
router.get("/getFinance/:id", GetFinance);
router.get("/get-finance-history", GetFinanceHistory);

export default router;
