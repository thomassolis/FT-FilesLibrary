import axios from 'axios';
import toast from 'react-hot-toast';
const instance = axios.create({
    // baseURL: 'https://localhost:3000/api/',
    baseURL: 'https://bk-fileslibrary.onrender.com/api/',
    withCredentials: true
});

//Interceptor de respuesta para manejar errores 401 (token vencido)
instance.interceptors.response.use(
    (response) => response, // Si la respuesta es correcta, devuélvela tal cual
    (error) => {
        if (error.response && error.response.status === 401) {
            toast.error('El token ha expirado. Redirigiendo al login...');
            window.location.href = '/'; 
        }
        return Promise.reject(error); // Propaga el error para manejo local
    }
);

export default instance;
