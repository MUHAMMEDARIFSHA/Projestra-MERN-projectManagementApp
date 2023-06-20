import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// components
import SignIn from "./components/user/SignIn/SignIn";
import SignUp from "./components/user/SignUp/SignUp";
import Otp from "./components/user/SignUp/Otp";
import HomeBeforeSignIn from "./components/user/HomePage/HomeBeforeSignIn";
import HomeAfterSignIn from "./components/user/HomePage/HomeAfterSignIn.jsx";
import AdminSignIn from "./components/admin/AdminSignIn";
import AdminHome from "./components/admin/adminHome";
import UserDetails from "./components/admin/UserDeatails";

// Public Routes
import UserPublicRoutes from "./routesTypes/UserPublicRoute";
import AdminPublicRoutes from "./routesTypes/AdminPublicRoute";

// Protected Routes
import UserProtectedRoutes from "./routesTypes/UserProtectedRoute";
import AdminProtectedRoute from "./routesTypes/AdminProtectedRoute";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<UserPublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup/otp" element={<Otp />} />
        </Route>

        <Route element={<UserProtectedRoutes />}>
          <Route path="/" element={<HomeBeforeSignIn />} />
          <Route path="/home" element={<HomeAfterSignIn />} />
        </Route>

        <Route element={<AdminPublicRoutes />}>
          <Route path="/admin/signin" element={<AdminSignIn />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/users" element={<UserDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;