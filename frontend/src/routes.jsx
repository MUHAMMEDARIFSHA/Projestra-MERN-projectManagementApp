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
import EditPassword from "./components/user/SignIn/EditPassword";
import UserProfile from "./components/user/Profile/UserProfile";
import ProfileEdit from "./components/user/Profile/ProfileEdit";
import CreateProject from "./components/project/CreateProject";
import IndivitualProject from "./components/project/IndivitualProject/IndivitualProject";
import ProjectsListing from "./components/project/ProjectsListing";
import GroupProject from "./components/project/GroupProject/GroupProject";
import AddMembers from "./components/project/GroupProject/AddMembers";
import ProjectsTasks from "./components/project/GroupProject/ProjectsTasks";
import OngoingTasks from "./components/project/GroupProject/OngoingTasks";
import CompletedTasks from "./components/project/GroupProject/CompletedTasks";
import MemberProject from "./components/project/GroupProject/MembersView/MemberProject";
import MemberDashboard from "./components/project/GroupProject/MembersView/MemberDashboard";
import MemberCompleted from "./components/project/GroupProject/MembersView/MemberCompleted";
import MemberOngoing from "./components/project/GroupProject/MembersView/MemberOngoing";
import MemberTask from "./components/project/GroupProject/MembersView/MemberTask";
import ChatPage from "./components/project/GroupProject/Chat/ChatPage";
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
          <Route
            path="/user/:id/verify/:token/editpassword"
            element={<EditPassword />}
          />
          
        </Route>

        <Route element={<UserProtectedRoutes />}>
        <Route path="/" element={<HomeBeforeSignIn />} />
          <Route path="/home" element={< HomeAfterSignIn/>} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/user/profile/edit" element={<ProfileEdit />} />
          <Route path="/user/createproject" element={<CreateProject />} />
          <Route
            path="/user/indivitualproject"
            element={<IndivitualProject />}
          />
          <Route path="/user/projects" element={<ProjectsListing />} />
          <Route path="/user/groupproject" element={<GroupProject />} />

          <Route path="/user/project/addmembers" element={<AddMembers />} />
          <Route
            path="/user/groupproject/project"
            element={<ProjectsTasks />}
          />
          <Route path="/user/groupproject/ongoing" element={<OngoingTasks />} />
          <Route
            path="/user/groupproject/completed"
            element={<CompletedTasks />}
          />
          <Route path="/user/groupproject/chat" element={<ChatPage />} />

          {/* Member Routes */}
          <Route path="/user/groupproject/member" element={<MemberProject />} />
          <Route
            path="/user/groupproject/member/dashboard"
            element={<MemberDashboard />}
          />
          <Route
            path="/user/groupproject/member/project"
            element={<MemberProject />}
          />
          <Route
            path="/user/groupproject/member/task"
            element={<MemberTask />}
          />
          <Route
            path="/user/groupproject/member/ongoing"
            element={<MemberOngoing />}
          />
          <Route
            path="/user/groupproject/member/completed"
            element={<MemberCompleted />}
          />
          {/* Member Routes  */}
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
