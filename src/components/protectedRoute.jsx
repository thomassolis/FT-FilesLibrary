import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authProvider';

const ProtectedRoute = ({ allowedRoles, redirectTo = "/" }) => {
  const { userRole, isAuthenticated } = useContext(AuthContext);

  try {
    if (!isAuthenticated) {
      // Redirigir a la página de inicio de sesión
      return <Navigate to={redirectTo} replace />;
    }



    // Si el usuario está autenticado y tiene los permisos necesarios, permitir el acceso
    return <Outlet />;
  } catch (error) {
    console.error('Error en ProtectedRoute:', error);
    // Redirigir a una página de error
    return <Navigate to="/error" replace />;
  }
};

export default ProtectedRoute;