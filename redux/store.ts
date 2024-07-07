import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice";

export const store = configureStore({
  reducer: { auth: authReducer },
});
