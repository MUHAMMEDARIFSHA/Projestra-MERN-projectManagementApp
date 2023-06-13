import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authState: localStorage.getItem('token') ? localStorage.getItem('token') : null
}
const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
       userSetAuth : (state) => {
        console.log("entered user ser auth")
           state.authState = localStorage.getItem('token')
       } ,
       userClearAuth: (state) => {
        console.log("entered user clear aut")
          state.authState = null
       }
     }
  })

  export default authSlice.reducer
export const { userSetAuth , userClearAuth } = authSlice.actions