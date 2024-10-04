import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState(null);
    const [banTime, setBanTime] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <AuthContext.Provider value={{userRole, setUserRole, userName, setUserName, banTime, setBanTime, isAuthenticated, setIsAuthenticated, isDisabled, setIsDisabled }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider