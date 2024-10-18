import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';

const ProtectedRoute = ({ allowedRoles, redirectTo = "/"}) => {
    const { userRole, isAuthenticated } = useContext(AuthContext);
    console.log(userRole)
    // Si no está autenticado, redirigir al login

    // if (!isAuthenticated) {
        // return <Navigate to={redirectTo} replace />;
    // }

    // Si el usuario no tiene un rol y no se especifican roles permitidos, permite el acceso
    // if (!userRole && !allowedRoles) {
        // return <Outlet />;
    // }

    // Si el rol del usuario no está en los roles permitidos, redirigir
    // if (allowedRoles && !allowedRoles.includes(userRole)) {
    //     alert('No tienes permiso para acceder a esta ruta.');
    //     return <Navigate to={redirectTo} replace />;
    // }

    // Si el usuario está autorizado
    return <Outlet/>;
};

export default ProtectedRoute;
