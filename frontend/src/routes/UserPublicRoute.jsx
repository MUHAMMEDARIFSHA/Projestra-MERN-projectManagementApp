import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function UserPublicRoutes() {
  const userAuthState = useSelector(state => state.userAuthReducer)
  console.log( userAuthState+"authstate of user");
  return (
    !userAuthState.auth? <Outlet/> : <Navigate to='/'/>
  )
}

export default UserPublicRoutes