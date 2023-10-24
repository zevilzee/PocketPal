import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
  },
  status: {
    type: String,
    enum: ["paid", "unpaid"],
    required: true,
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
