import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
};

const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export default emailSlice.reducer;
export const { setEmail } = emailSlice.actions;

