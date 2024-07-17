import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slice"; // Ensure this is the correct path to your slice

export const store = configureStore({
  reducer: { auth: authReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
