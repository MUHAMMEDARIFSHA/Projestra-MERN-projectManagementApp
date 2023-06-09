import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./components/user/SignUp/SignUp";
import SighIn from "./components/user/SignIn/SignIn"
import HomeAfterSignIn from "./components/user/HomePage/HomeAfterSignIn";
import Navbar from "./components/user/Navbar";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeAfterSignIn/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="signin" element={<SighIn/>}/>
      </Routes>
    </Router>
  );
}

export default App;
