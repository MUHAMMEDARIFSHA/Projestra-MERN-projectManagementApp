// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate, Outlet } from 'react-router-dom';

// function UserProtectedRoute() {
//   const userAuthState = useSelector((state) => state.userAuthReducer);
//   console.log(userAuthState + 'state auth');

//   return (
//     userAuthState.auth?<Outlet /> : <Navigate to="/signin" />
//   );
// }

// export default UserProtectedRoute;
import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from 'react-router-dom';


function UserProtectedRoutes() {
    const userAuthState = useSelector((state) => {

        return state.userAuth?.authState;
    })
    return (userAuthState ? <Outlet /> : <Navigate to='/signin' />)
}

export default UserProtectedRoutes