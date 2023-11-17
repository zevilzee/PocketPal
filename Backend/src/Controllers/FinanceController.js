import FinanceSchema from "../Models/FinanceModel.js";

export const GetFinanceHistory = async (req, res, next) => {
  const { startDate, endDate, user } = req.body;
  console.log(req.body);
  try {
    const FinanceHistory = await FinanceSchema.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      user: user,
    });

    res.send(FinanceHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const GetFinance = async (req, res, next) => {
  try {
    const finances = await FinanceSchema.find({ user: req.params.id });
    let newFinances = finances.map((item) => {
      const percentageSaved = (item.Savedamount / item.Goalamount) * 100;
      const date = new Date();
      let status = "";
      if (item.endDate < date) {
        status = "Timed Out";
      }
      return {
        ...item,
        precentage: percentageSaved,
        status: status,
      };
    });
    res.send({ status: 200, data: finances });
  } catch (e) {
    console.log(e);
  }
};

export const createFinance = async (req, res, next) => {
  try {
    const finance = await FinanceSchema.create(req.body);

    res.send({ status: 200, message: finance });
  } catch (e) {
    console.log(e);
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

export const updateFinance = async (req, res, next) => {
  try {
    const finance = await FinanceSchema.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.send({ status: 200, message: finance });
  } catch (e) {
    res.send({ status: 500, message: "Internal Server Error" });
  }
};

export const deleteFinance = async (req, res, next) => {
  try {
    const finance = await FinanceSchema.findByIdAnDelete({
      _id: req.params.id,
    });
    res.send({ status: 200, message: "Finance Deleted Successfully" });
  } catch (e) {
    res.send({ status: 500, message: "Internal Server Error" });
  }
};
