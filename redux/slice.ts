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
      const tempState = { ...state };
      console.log("action payload", action.payload);
      tempState.auth = { ...action.payload };
      return tempState;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
