import React, { createContext, useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';

// Clave secreta para el cifrado
const secretKey = import.meta.env.VITE_SECRET_KEY;

// Si no está definida la clave, mostrar advertencia
if (!secretKey) {
  console.error("Error: La clave secreta (VITE_SECRET_KEY) no está definida en el archivo .env.");
}

// Función para cifrar valores
const encrypt = (value) => {
  return CryptoJS.AES.encrypt(value, secretKey).toString();
};

// Función para descifrar valores
const decrypt = (encryptedValue) => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, secretKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch (error) {
    console.error("Error al descifrar. Datos manipulados o clave incorrecta.", error);
    return null;
  }
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(() => {
    const encryptedRole = sessionStorage.getItem('userRole');
    const decryptedRole = encryptedRole ? decrypt(encryptedRole) : null;
    return decryptedRole;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const encryptedAuth = sessionStorage.getItem('isAuthenticated');
    const decryptedAuth = encryptedAuth ? decrypt(encryptedAuth) === 'true' : false;
    return decryptedAuth;
  });

  const [userName, setUserName] = useState(null);
  const [banTime, setBanTime] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  // Efecto para guardar en sessionStorage cuando los valores cambien
  useEffect(() => {
    if (userRole) {
      sessionStorage.setItem('userRole', encrypt(userRole));
    }
  }, [userRole]);

  useEffect(() => {
    sessionStorage.setItem('isAuthenticated', encrypt(String(isAuthenticated)));
  }, [isAuthenticated]);

  // Comprobar si la autenticación y los roles están manipulados al detectar cambios en sessionStorage
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'userRole' || event.key === 'isAuthenticated') {
        const encryptedRole = sessionStorage.getItem('userRole');
        const encryptedAuth = sessionStorage.getItem('isAuthenticated');

        const decryptedRole = encryptedRole ? decrypt(encryptedRole) : null;
        const decryptedAuth = encryptedAuth ? decrypt(encryptedAuth) : null;

        // Verificar si las variables fueron manipuladas
        if (decryptedAuth !== 'true' && decryptedAuth !== 'false') {
          toast.error("Autenticación manipulada. Redirigiendo al login...");
          sessionStorage.clear();
          setIsAuthenticated(false);
          window.location.href = '/login';
        }

        if (!decryptedRole) {
          toast.error("Rol de usuario manipulado. Redirigiendo al login...");
          sessionStorage.clear();
          setUserRole(null);
          window.location.href = '/login';
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userRole,
        setUserRole,
        userName,
        setUserName,
        banTime,
        setBanTime,
        isAuthenticated,
        setIsAuthenticated,
        isDisabled,
        setIsDisabled,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
