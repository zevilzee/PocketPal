import { Router } from "express";
import { GetIncomeHistory } from "../Controllers/IncomeController.js";
import { checkLogin } from "../Middlewares/checkLogin.js";
import { createIncome, deleteIncome, updateIncome } from "../Controllers/IncomeController.js";
const router = Router();
router.get("/get-income-history", checkLogin, GetIncomeHistory);
router.post("/create-income",checkLogin,createIncome);
router.patch("/update-income/:id",checkLogin,updateIncome);
router.delete("/delete-inome/:id",checkLogin,deleteIncome);

export default router;