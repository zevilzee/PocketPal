import Expense from "../Models/ExpenseModel.js";
import User from "../Models/userModel.js";
export const GetExpenseHistory = async (req, res, next) => {
  const { startDate, endDate, user } = req.body;
  console.log(req.body);
  try {
    const ExpenseHistory = await Expense.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      user: user,
    });

    res.send(ExpenseHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetExpense = async (req, res, next) => {
  //console.log("getExpense called", req.user);
  try {
    const ExpenseHistory = await Expense.find({
      user: req.params.id,
    });
    res.json(ExpenseHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createExpense = async (req, res, next) => {
  const { user } = req.body;

  let userData = await User.findOne({ _id: user });
  const newBalance = parseInt(userData.balance) - parseInt(req.body.amount);

  await User.findByIdAndUpdate(
    { _id: user },
    { balance: newBalance.toString() }
  );

  let expense = await Expense.create(req.body);

  res.send({ status: 200, data: expense });
};

export const updateExpense = async (req, res, next) => {
  if (req.body.amount) {
    const expense = await Expense.findOne({ _id: req.params.id });
    let userData = await User.findOne({ _id: expense.user });
    let newBalance = parseInt(expense.amount) + parseInt(userData.balance);
    newBalance = parseInt(userData.balance) - parseInt(req.body.amount);

    await User.findByIdAndUpdate(
      { _id: expense.user },
      { balance: newBalance.toString() }
    );

    const updatedExpense = await Expense.findByIdAndUpdate(
      { _id: req.params.id },
      { amount: req.body.amount },
      { new: true }
    );

    res.send({ status: 200, data: updatedExpense });
  } else {
    const updatedExpense = await Expense.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send({ status: 200, data: updatedExpense });
  }
};

export const deleteExpense = async (req, res, next) => {
  const expense = await Expense.findOne({ _id: req.params.id });
  console.log(expense);
  let userData = await User.findOne({ _id: expense.user });
  console.log(userData);
  console.log(expense);
  const newBalance = parseInt(expense.amount) - parseInt(userData?.balance);

  await User.findByIdAndUpdate(
    { _id: expense.user },
    { balance: newBalance.toString() }
  );

  await Expense.findByIdAndDelete({ _id: req.params.id });

  res.send({ status: 200, data: "Deleted Successfully" });
};
