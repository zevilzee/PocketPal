import FinanceSchema from "../Models/FinanceModel.js";

export const GetFinanceHistory = async (req, res, next) => {};

export const GetFinance = async (req, res, next) => {
  try {
    const finances = await FinanceSchema.create({ _id: req.params.id });
    let newFinances = finances.map((item) => {
      const percentageSaved = (item.savedAmount / item.goalAmount) * 100;
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
    res.send({ status: 200, data: newFinances });
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
        ...req.body.data,
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
