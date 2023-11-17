import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
      //   validate: {
      //     validator: function (value) {
      //       return /^\d{10}$/.test(value.toString());
      //     },
      //     message: "Phone number must be 11 digits.",
      //   },
    },
    ExpenseCategory: {
      type: [],
    },
    IncomeType: {
      type: [],
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      default: "0",
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
