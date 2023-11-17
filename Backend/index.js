import express from "express";
import http from "http";
import cors from "cors";
import "./src/config/config.js";
import userRoutes from "./src/Routes/userRoutes.js";
import expenseRoutes from "./src/Routes/ExpenseRoutes.js";
import incomeRoutes from "./src/Routes/IncomeRoutes.js";
import FinanceRoutes from "./src/Routes/FinanceRoutes.js";
const app = express();
app.use(
  cors({
    methods: "GET,POST,PUT,DELETE",
    // ...other CORS options
  })
);
app.use(express.static("./uploads"));
app.use(express.json());
const server = http.createServer(app);
app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/finance", FinanceRoutes);
server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running");
});
