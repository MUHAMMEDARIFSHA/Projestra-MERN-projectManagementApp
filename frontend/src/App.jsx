import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/user/SignUp/SignUp";
import SighIn from "./components/user/SignIn/SignIn";
import HomeAfterSignIn from "./components/user/HomePage/HomeAfterSignIn";
import Otp from "./components/user/SignUp/Otp";
import { Provider, useSelector } from "react-redux";
import AdminSignIn from "./components/admin/AdminSignIn";

import UserProtectedRoute from "./routes/UserProtectedRoute";
import UserPublicRoutes from "./routes/UserPublicRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<UserPublicRoutes />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SighIn />} />
          <Route path="/signup/otp" element={<Otp />} />
         
        </Route>

        <Route element={<UserProtectedRoute />}>
          <Route path="/" element={<HomeAfterSignIn />} />
         
        </Route>
        <Route path ="/admin/signin" element={<AdminSignIn/>}/>
      </Routes>
    </Router>
  );
}

export default App;
