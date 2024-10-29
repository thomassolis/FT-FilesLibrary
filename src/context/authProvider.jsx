import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    const [banTime, setBanTime] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [isDisabled, setIsDisabled] = useState(false);

        // Efecto para actualizar sessionStorage cuando userRole cambie
        useEffect(() => {
            if (userRole) {
                sessionStorage.setItem('userRole', userRole);
            }
        }, [userRole]); // Solo actualiza cuando userRole cambie

                // Efecto para actualizar sessionStorage cuando userRole cambie
        useEffect(() => {
            if (isAuthenticated) {
                sessionStorage.setItem('isAuthenticated', isAuthenticated);
            }
        }, [isAuthenticated]); // Solo actualiza cuando userRole cambie

    return (
        <AuthContext.Provider value={{userRole, setUserRole, userName, setUserName, banTime, setBanTime, isAuthenticated, setIsAuthenticated, isDisabled, setIsDisabled }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider