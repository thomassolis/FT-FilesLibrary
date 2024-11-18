import axios from './axios';

export const enviarLogin = async (data) => {
    const response = await axios.post('auth/login', {
        Email: data.email,
        Password: data.password
    });
    return response.data;
}

export const enviarVerificacion2pasos = async (data) => {
    try{
        const response = await axios.post('auth/authentication/2fa', {
            authentication: data.authentication,
            withCredentials: true
        });
        return response;
    }
    catch (error)
    {
        console.log(error)
    }
}