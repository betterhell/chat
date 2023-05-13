import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode
    isAuth: boolean
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({isAuth, children}) => {
    return isAuth ? <Outlet/> : <Navigate to="/"/>;
};

export default PrivateRoute;