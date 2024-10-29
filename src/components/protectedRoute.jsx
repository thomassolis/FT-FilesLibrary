import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';

const ProtectedRoute = ({ allowedRoles, redirectTo = "/" }) => {
    const { userRole, isAuthenticated } = useContext(AuthContext);

    //Si isAuthenticated es null o false, redirigir a login
    if (!isAuthenticated) {  // Solo permite el acceso si isAuthenticated es true
        console.log('Usuario no autenticado o estado indefinido, redirigiendo a login');
        return <Navigate to={redirectTo} replace />;
    }

    // Si está autenticado pero no tiene un rol aún, redirigir a autenticador
    if (isAuthenticated && !userRole && allowedRoles) {
        console.log('Usuario autenticado pero sin rol, redirigiendo al autenticador');
        return <Navigate to="/authentication" replace />;
    }

    // Si se especifican roles y el rol del usuario no está permitido, denegar acceso
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        console.log('Acceso denegado. Rol del usuario no permitido:', userRole);
        return <Navigate to="/" replace />;
    }

    // Si está autenticado y tiene un rol permitido, permitir acceso
    console.log('Acceso permitido para el rol:', userRole);
    return <Outlet />;
};

export default ProtectedRoute;
