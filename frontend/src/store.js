import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import userSlice from "./Slices/userSlice";

const persistconfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
};

const RootReducer = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistconfig, RootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export { RootReducer };
