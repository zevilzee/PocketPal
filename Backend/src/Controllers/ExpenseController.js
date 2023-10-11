import Expense from "../Models/ExpenseModel.js";

export const GetExpenseHistory = async (req, res, next) => {
  const { startDate, endDate, user } = req.body;
  try {
    const ExpenseHistory = await Expense.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      user: user,
    });

    res.json(ExpenseHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
