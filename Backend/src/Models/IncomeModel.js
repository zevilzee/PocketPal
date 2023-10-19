import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    required: true,
    ref: "User",
    type: mongoose.Schema.Types.ObjectId
  },
  Method: {
    type: String,
    required: true,
  },
  name:{
    type:String,
    required:true,
  }
});

const Income = mongoose.model("Income", IncomeSchema);

export default Income;
