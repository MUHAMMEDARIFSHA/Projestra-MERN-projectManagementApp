// import React from 'react'
// import { useSelector } from 'react-redux'
// import { Navigate, Outlet } from 'react-router-dom'

// function UserPublicRoutes() {
//   const userAuthState = useSelector(state => state.userAuthReducer)
//   console.log( userAuthState+"authstate of user");
//   return (
//     !userAuthState.auth? <Outlet/> : <Navigate to='/'/>
//   )
// }

// export default UserPublicRoutes

import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const UserPublicRoutes = () => {

    const UserAuthState = useSelector((state) => {

        return state.userAuth?.authState;
    })
    return(!UserAuthState ? <Outlet/>: <Navigate to='/home'/>)

}

export default UserPublicRoutes