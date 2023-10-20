import Income from "../Models/IncomeModel.js";
import User from "../Models/userModel.js";
export const GetIncomeHistory = async (req, res, next) => {
  const { startDate, endDate, user } = req.query;

  try {
    const incomeHistory = await Income.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      user: user,
    });

    res.send(incomeHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetIncome = async (req, res, next) => {
  console.log("getIncome called", req.user);
  try {
    const incomeHistory = await Income.find({
      user: req.params.id,
    });

    res.json(incomeHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createIncome = async (req, res, next) => {
  try {
    const { user } = req.body;

    let userData = await User.findOne({ _id: user });
    const newBalance = parseInt(userData.balance) + parseInt(req.body.amount);
    await User.findByIdAndUpdate(
      { _id: user },
      { balance: newBalance.toString() }
    );

    let income = await Income.create(req.body);
    res.send({ status: 200, data: income });
  } catch (e) {
    res.status(500).send(e);
  }
};

export const updateIncome = async (req, res, next) => {
  if (req.body.amount) {
    const income = await Income.findOne({ _id: req.params.id });
    let userData = await User.findOne({ _id: income.user });
    let newBalance = parseInt(income.amount) - parseInt(userData.balance);
    newBalance = parseInt(userData.balance) + parseInt(req.body.amount);

    await User.findByIdAndUpdate(
      { _id: income.user },
      { balance: newBalance.toString() }
    );

    const updatedIncome = await Income.findByIdAndUpdate(
      { _id: req.params.id },
      { amount: req.body.amount },
      { new: true }
    );

    res.send({ status: 200, data: updatedIncome });
  } else {
    const updatedIncome = await Income.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    res.send({ status: 200, data: updatedIncome });
  }
};

export const deleteIncome = async (req, res, next) => {
  const income = await Income.findOne({ _id: req.params.id });
  let userData = await User.findOne({ _id: income.user });
  const newBalance = parseInt(income.amount) - parseInt(userData.balance);

  await User.findByIdAndUpdate(
    { _id: income.user },
    { balance: newBalance.toString() }
  );

  await Income.findByIdAndUpdate({ _id: req.params.id });

  res.send({ status: 200, data: "Deleted Successfully" });
};
