import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

interface PrivateRouteProps {
    isAuth: boolean,
    children?: any
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({isAuth, children}) => {
    if (!isAuth) {
        return <Navigate to="/login"/>
    }
    return children ? children : <Outlet/>
};
export default PrivateRoute;