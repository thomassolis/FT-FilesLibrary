import axios from './axios';
import { Toaster,toast } from 'react-hot-toast';
export const enviarLogin = async (data) => {
    try{
        const response = await axios.post('auth/login', {
            Email: data.email,
            Password: data.password
        });
        return response.data;
    }catch(e){
        console.error('Error en enviarLogin', e)
        alert.error('Error en enviarLogin');
    }
    
}

//2. VERIFICACION DE 2 PASOS
        // ENVIAR CÓDIGO A BACKEND
    export const enviarVerificacion2pasos = async (data, userEmail) => {
        try{
            const response = await axios.post('auth/authentication/2fa', {
                authentication: data.authentication,
                userEmail: userEmail,
                withCredentials: true
            });
            if(response.data.success){
                return response;
            }else{
                toast.error(response.data.message);
            }
        }catch(e){
            console.error('Error en enviarVerificacion2pasos', e)
            toast.error('Código Incorrecto');
        }              
    }