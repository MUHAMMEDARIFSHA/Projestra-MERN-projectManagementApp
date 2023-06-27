import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

const userSlice = createSlice({

  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        console.log("inside user slice")
      state.user = action.payload;
    },
    clearUser:(state,action)=>{
        state.user = null
    }
  },
});

export default userSlice.reducer;
export const { setUser,clearUser} = userSlice.actions;
