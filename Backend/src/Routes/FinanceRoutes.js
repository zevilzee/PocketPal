import { Router } from "express";
import {
  GetFinance,
  createFinance,
  updateFinance,
  deleteFinance,
} from "../Controllers/FinanceController.js";

const router = Router();
router.post("/create-finance", createFinance);
router.patch("/update-finance/:id", updateFinance);
router.delete("/delete-finance/:id", deleteFinance);
router.get("/getFinance/:id", GetFinance);

export default router;
