import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import SignIn from "./components/user/SignIn/SignIn";
import SignUp from "./components/user/SignUp/SignUp";
import Otp from "./components/user/SignUp/Otp";
import HomeBeforeSignIn from "./components/user/HomePage/HomeBeforeSignIn";
import HomeAfterSignIn from "./components/user/HomePage/HomeAfterSignIn.jsx";
import AdminSignIn from "./components/admin/AdminSignIn";


// Public Routes
import UserPublicRoutes from "./routesTypes/UserPublicRoute";

// Protected Routes
import UserProtectedRoutes from "./routesTypes/UserProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<UserPublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup/otp" element={<Otp />} />
          <Route path='/' element={<HomeBeforeSignIn/>}/>
        </Route>

        <Route element={<UserProtectedRoutes />}>
          <Route path="/home" element={<HomeAfterSignIn />} />
        </Route>
        <Route path="/admin/signin" element={<AdminSignIn />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
