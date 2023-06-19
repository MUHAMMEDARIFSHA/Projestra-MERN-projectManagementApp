import React from "react";
import { useSelector } from "react-redux";

import { Navigate,Outlet } from "react-router-dom";

function AdminProtectedRoute(){
    const adminAuthState = useSelector((state)=>{
        return state.adminAuth?.authState
    })
    return (adminAuthState?<Outlet/>:<Navigate to="/admin/signin"/>)
 }

    export default AdminProtectedRoute