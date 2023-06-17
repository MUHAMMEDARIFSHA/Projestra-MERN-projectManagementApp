import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "../user/Navbar";
import Fragment from "react";
import { Typography } from "@mui/material";
import AdminNavbar from "./AdminNavbar";

function AdminHome() {
  return (
    <div>
        <AdminNavbar/>

    <Sidebar/>

     
   
    </div>
  );
}

export default AdminHome;
