import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector, shallowEqual } from "react-redux";
import { useActions } from "../Hooks/useActions";

export const initialState = {
  fullName: null,
  phoneNumber: null,
  profile: null,
  email: null,
  state: null,
  country: null,
  balance: null,
  city: null,
  IncomeType: null,
  ExpenseCategory: null,
  totalIncome: null,
  totalExpence: null,
  saveingPlan: null,
  authMethod: null,
  pin: null,
  image: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
    },
    setBalance: (state, action) => {
      state.balance = action.payload.balance;
    },
    setUser: (state, action) => {
      state.id = action.payload._id;
      state.fullName = action.payload.name;
      state.phoneNumber = action.payload.phoneNumber;
      state.profile = action.payload.profile;
      state.email = action.payload.email;
      state.state = action.payload.state;
      state.country = action.payload.country;
      state.balance = action.payload.balance;
      state.city = action.payload.city;
      state.IncomeType = action.payload.IncomeType;
      state.ExpenseCategory = action.payload.ExpenseCategory;
      state.image = action.payload.image;
    },
    setfullName: (state, action) => {
      state.fullName = action.payload;
    },
    setprofile: (state, action) => {
      state.profile = action.payload;
    },
    setemail: (state, action) => {
      state.email = action.payload;
    },
    settoken: (state, action) => {
      state.token = action.payload;
    },
    settotalIncome: (state, action) => {
      state.totalIncome = action.payload;
    },
    settotalExpence: (state, actions) => {
      state.totalExpence = actions.payload;
    },
    setsaveingPlan: (state, actions) => {
      state.saveingPlan = actions.payload;
    },
    setAuthMethod: (state, actions) => {
      state.authMethod = actions.payload.authMethod;
      state.pin = actions.payload.pin;
    },
    setimage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const actions = userSlice.actions;

export const useUserStateActions = () => useActions({ actions });

const userSelector = (state) => state.user;
export const useUserState = () => useSelector(userSelector, shallowEqual);

export default userSlice.reducer;
