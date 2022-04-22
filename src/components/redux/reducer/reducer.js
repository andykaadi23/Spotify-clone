import { createSlice } from "@reduxjs/toolkit";

export const tokenReducer = createSlice({
  name: "set_token",
  initialState: {
    token: " ",
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setToken } = tokenReducer.actions;

export default tokenReducer.reducer;
