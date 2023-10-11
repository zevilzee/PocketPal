import Income from "../Models/IncomeModel.js";

export const GetIncomeHistory = async (req, res, next) => {
  const { startDate, endDate, user } = req.body;
  try {
    const incomeHistory = await Income.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      user: user,
    });

    res.json(incomeHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
