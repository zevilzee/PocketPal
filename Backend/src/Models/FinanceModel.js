import mongoose, { Mongoose } from "mongoose";

const FinanceSchema = new mongoose.Schema({
  Goalamount: { type: Number, required: true },
  Savedamount: { type: Number, required: true },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  purpose: {
    type: String,
  },
  status: {
    type: String,
  },
  user: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

const finance = mongoose.model("Finance", FinanceSchema);

export default FinanceSchema;
