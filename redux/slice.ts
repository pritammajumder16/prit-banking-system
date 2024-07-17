import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface IServiceState {
  auth: User | null;
}

const initialState: IServiceState = {
  auth: null,
};

export const authSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User>) => {
      console.log("action.payload", action.payload);
      state.auth = { ...action.payload };
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
