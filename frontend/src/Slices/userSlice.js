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
  ExpenseCategory:null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetState: () => {
      return initialState;
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
      state.IncomeType= action.payload.IncomeType;
      state.ExpenseCategory = action.payload.ExpenseCategory;
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
  },
});

export const actions = userSlice.actions;

export const useUserStateActions = () => useActions({ actions });

const userSelector = (state) => state.user;
export const useUserState = () => useSelector(userSelector, shallowEqual);

export default userSlice.reducer;
