import React from 'react'
import {useSelector} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';


const AdminPublicRoutes = () => {

    const AdminAuthState = useSelector((state) => {

        return state.adminAuth?.authState;
    })
    return(!AdminAuthState ? <Outlet/>: <Navigate to='/admin/home'/>)

}

export default AdminPublicRoutes