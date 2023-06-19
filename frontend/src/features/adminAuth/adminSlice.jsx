import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    authState:localStorage.getItem("adminToken")? localStorage.getItem("adminToken") :null
}

const adminAuthSlice = createSlice({
    name:"admin",
    initialState,
    reducers:{
        adminSetAuth :(state)=>{
            console.log("entered admin set auth")
            state.authState= localStorage.getItem("adminToken")
        },

        adminClearAuth:(state)=>{
            console.log("entered admin clear auth")
            state.authState = null
        }
    }
})

export default adminAuthSlice.reducer
export const {adminSetAuth,adminClearAuth}  = adminAuthSlice.actions